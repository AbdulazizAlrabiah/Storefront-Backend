import client from '../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateToken } from '../controller/authentication';

const bcrypt_pepper = process.env.BCRYPT_PASSWORD;
const salt_rounds = parseInt(process.env.SALT_ROUNDS as unknown as string);

export type User = {
  id: number;
  firstName: String;
  lastName: String;
  password: String;
};

export class UserStore {
  static async listAll(): Promise<Omit<User, 'password'>[]> {
    try {
      const con = await client.connect();
      const sql = 'SELECT id, first_name, last_name FROM users';
      const result = await con.query(sql);

      con.release();

      console.log(result.rows);

      //   const order: Order = {
      //     id: orderId,
      //     userId: userId,
      //     products: productsResult.rows.map((product) => ({
      //       productId: parseInt(product.product_id),
      //       quantity: parseInt(product.quantity),
      //     })),

      const users: Omit<User, 'password'>[] = [];

      for (let user of result.rows) {
        users.push({
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
        });
      }

      return users;
    } catch (err) {
      throw new Error(`error ${err}`);
    }
  }

  static async showUserAt(id: number): Promise<Omit<User, 'password'> | null> {
    try {
      const con = await client.connect();
      const sql = 'SELECT id, first_name, last_name FROM users WHERE id=$1';
      const result = await con.query(sql, [id]);

      con.release();

      console.log(result.rows);

      const user: Omit<User, 'password'> = {
        id: result.rows[0]?.id,
        firstName: result.rows[0]?.first_name,
        lastName: result.rows[0]?.last_name,
      };

      return user;
    } catch (err) {
      console.log(err);
      throw new Error(`error ${err}`);
    }
  }

  static async insertUser(user: Omit<User, 'id'>): Promise<String> {
    try {
      const con = await client.connect();
      const sql =
        'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *';
      const hashedPassword = bcrypt.hashSync(
        user.password + String(bcrypt_pepper),
        salt_rounds
      );
      const params = [user.firstName, user.lastName, hashedPassword];
      const result = await con.query(sql, params);

      const newUser: Omit<User, 'password'> = {
        id: result.rows[0]?.id,
        firstName: result.rows[0]?.first_name,
        lastName: result.rows[0]?.last_name,
      };

      con.release();

      console.log(newUser);

      const token = generateToken(newUser);

      console.log(token);

      return token;
    } catch (err) {
      console.log(err);
      throw new Error(`error ${err}`);
    }
  }
}
