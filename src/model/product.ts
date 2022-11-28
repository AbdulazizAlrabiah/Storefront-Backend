import client from '../database'

export type Product = {
    id: number
    name: String
    price: number
    category: String
}

export class ProductStore {

    static async listAll(): Promise<Product[]> {

        try {
            const con = await client.connect();
            const sql = 'SELECT * FROM products'
            const result = await con.query(sql);

            con.release();
    
            return result.rows;
        }
        catch (err) {
            throw new Error(`error ${err}`);
        }
    }

    static async showProductAt(id: number): Promise<Product> {

        try {
            const con = await client.connect();
            const sql = 'SELECT (id, name, price, category) FROM products WHERE id=$1'
            const result = await con.query(sql, [id]);

            con.release();

            console.log(result.rows)

            return result.rows[0];
        }
        catch (err) {
            throw new Error(`error ${err}`);
        }
    }
}