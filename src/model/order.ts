import client from '../database';

export type Order = {
  id: number;
  userId: number;
  products: {
    productId: number;
    quantity: number;
  }[];
  status: String;
};

export class OrderStore {
  static async showOrderAt(userId: number): Promise<Order | null> {
    try {
      const con = await client.connect();
      const sql = "SELECT id FROM orders WHERE user_id=$1 AND status='Active'";
      const result = await con.query(sql, [userId]);

      console.log(result.rows);

      const orderId = result.rows[0]?.id;

      if (orderId == null) {
        return null;
      }

      const sql2 = 'SELECT * FROM order_products WHERE order_id=$1';
      const productsResult = await con.query(sql2, [orderId]);

      con.release();

      console.log(productsResult.rows);

      const order: Order = {
        id: orderId,
        userId: userId,
        products: productsResult.rows.map((product) => ({
          productId: parseInt(product.product_id),
          quantity: parseInt(product.quantity),
        })),
        status: 'Active',
      };

      console.log(order);

      return order;
    } catch (err) {
      console.log(err);
      throw new Error(`error ${err}`);
    }
  }
  // TODO: Better to return the whole order rather than just the add
  static async addProductToOrder(
    userId: number,
    productId: number,
    quantity: number
  ): Promise<number> {
    try {
      const con = await client.connect();
      const sql = "SELECT id FROM orders WHERE user_id=$1 AND status='Active'";
      const selectResult = await con.query(sql, [userId]);

      const orderId = selectResult.rows[0]?.id;
      if (orderId != null) {
        // TODO: Can export this sql statement with below one
        const sql2 =
          'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING order_id, product_id, quantity';
        const insertProduct = await con.query(sql2, [
          orderId,
          productId,
          quantity,
        ]);

        console.log(insertProduct.rows[0].order_id);

        con.release();

        return parseInt(insertProduct.rows[0].order_id);
      } else {
        const sql2 =
          'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
        const insertOrder = await con.query(sql2, [userId, 'Active']);
        const newOrderId = insertOrder.rows[0].id;

        console.log('order id:' + newOrderId);

        const sql3 =
          'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING order_id, product_id, quantity';
        const insertProduct = await con.query(sql3, [
          newOrderId,
          productId,
          quantity,
        ]);

        console.log(insertProduct.rows[0].order_id);

        con.release();

        return parseInt(insertProduct.rows[0].order_id);
      }
    } catch (err) {
      console.log(err);
      throw new Error(`error ${err}`);
    }
  }

  // returns the deleted product if the order was found
  // returns null when order is not found
  static async deleteProductFromOrder(
    userId: number,
    productId: number
  ): Promise<Product | null> {
    try {
      const con = await client.connect();
      const sql = "SELECT id FROM orders WHERE user_id=$1 AND status='Active'";
      const selectResult = await con.query(sql, [userId]);

      const orderId = selectResult.rows[0]?.id;
      
      if (orderId != null) {
        const sql2 = 'DELETE FROM order_products WHERE product_id=$1 AND order_id=$2 RETURNING product_id';
        const deleteProductResult = await con.query(sql2, [productId, orderId]);

        con.release();

        console.log(deleteProductResult.rows);

        return await ProductStore.showProductAt(deleteProductResult.rows[0].product_id as number);
      } else {
        // Order not found
        return null
      }
    } catch (err) {
      console.log(err);
      throw new Error(`error ${err}`);
    }
  }
}
