import client from '../database'

export type Order = {
    id: number
    userId: number
    products: {
        productId: number
        quantity: number
    }[]
    status: String
}

export class OrderStore {

    static async showOrderAt(userId: number): Promise<Order | null> {

        try {
            const con = await client.connect();
            const sql = 'SELECT (id) FROM orders WHERE user_id=$1 AND status=ACTIVE'
            const result = await con.query(sql, [userId]);

            console.log(result.rows)

            const orderId = result.rows[0]
            
            if (orderId == null) {
                return null
            }

            const sql2 = 'SELECT * FROM order_products WHERE order_id=$1'
            const productsResult = await con.query(sql2, [orderId])

            con.release();

            console.log(productsResult.rows)

            const order: Order = {
                id: orderId,
                userId: userId,
                products: productsResult.rows.map( product => ({ productId: parseInt(product.product_id), quantity: parseInt(product.quantity) }) ),
                status: 'ACTIVE'
            }

            console.log(order)

            return order;
        }
        catch (err) {
            throw new Error(`error ${err}`);
        }
    }

    static async addProductToOrder(userId: number, productId: number, quantity: number): Promise<number> {

        try {
            const con = await client.connect();
            const sql = 'SELECT id FROM orders WHERE user_id=$1 AND status=ACTIVE'
            const selectResult = await con.query(sql, [userId]);

            const orderId = selectResult.rows[0]

            if (orderId != null) {
                
                const sql2 = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *'
                const insertProduct = await con.query(sql2, [orderId, productId, quantity]);

                console.log(insertProduct.rows[0])

                con.release();

                return orderId
            } else {
                const sql2 = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING id'
                const insertOrder = await con.query(sql2, [userId, 'ACTIVE']);
                const newOrderId = insertOrder.rows[0]

                console.log('order id:' + newOrderId)

                const sql3 = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *'
                const insertProduct = await con.query(sql3, [newOrderId, productId, quantity]);

                console.log(insertProduct.rows[0])

                con.release();

                return newOrderId
            }
        }
        catch (err) {
            throw new Error(`error ${err}`);
        }
    }
}