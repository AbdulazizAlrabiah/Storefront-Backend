import client from '../database';

export type Product = {
  id: number,
  name: String,
  price: number,
  category: String,
  imageLink: String,
  description: String,
};

export class ProductStore {
  static async listAll(): Promise<Product[]> {
    try {
      const con = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await con.query(sql);

      con.release();

      const products: Product[] = [];

      for (let product of result.rows) {
        products.push({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price),
          category: product.category,
          imageLink: product.image_link,
          description: product.description,
        });
      }

      return products;
    } catch (err) {
      console.log(err);
      throw new Error(`error ${err}`);
    }
  }

  static async showProductAt(id: number): Promise<Product> {
    try {
      const con = await client.connect();
      const sql = 'SELECT * FROM products WHERE id=$1';
      const result = await con.query(sql, [id]);

      con.release();

      console.log(result.rows);

      const product: Product = {
        id: result.rows[0].id,
        name: result.rows[0].name,
        price: parseFloat(result.rows[0].price),
        category: result.rows[0].category,
        imageLink: result.rows[0].image_link,
        description: result.rows[0].description,
      };

      return product;
    } catch (err) {
      throw new Error(`error ${err}`);
    }
  }
}
