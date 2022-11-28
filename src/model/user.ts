import client from '../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const bcrypt_pepper = process.env.BCRYPT_PASSWORD;
const salt_rounds = parseInt(process.env.SALT_ROUNDS as unknown as string);

export type User = {
    id: number
    firstName: String
    lastName: String
    password: String
}

export class UserStore {

    static async listAll(): Promise<User[]> {

        try {
            const con = await client.connect();
            const sql = 'SELECT (id, first_name, last_name) FROM users'
            const result = await con.query(sql);

            con.release();

            console.log(result.rows)

            return result.rows;
        }
        catch (err) {
            throw new Error(`error ${err}`);
        }
    }

    static async showUserAt(id: number): Promise<User>  {

        try {
            const con = await client.connect();
            const sql = 'SELECT (id, first_name, last_name) FROM users WHERE id=$1'
            const result = await con.query(sql, [id]);

            con.release();

            console.log(result.rows)

            return result.rows[0];
        }
        catch (err) {
            throw new Error(`error ${err}`);
        }
    }

    static async insertUser(user: Omit<User, 'id'>): Promise<String> {

        try {
            const con = await client.connect();
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *'
            const hashedPassword = bcrypt.hashSync(user.password + String(bcrypt_pepper), salt_rounds);
            const params = [user.firstName, user.lastName, hashedPassword];
            const result = await con.query(sql, params);
            
            const newUser = result.rows[0];

            con.release();

            console.log(newUser);

            const token = jwt.sign({ user: {
                id: parseInt(newUser.id as string),
                username: newUser.name,
            }, }, String(process.env.TOKEN_SECRET));

            console.log(token)

            return token;
        }
        catch (err) {
            throw new Error(`error ${err}`);
        }
    }
}