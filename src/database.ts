import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const env = process.env.ENV;

let client: Pool;

const { HOST, DATABASE, TEST_DATABASE, USER, PASSWORD } = process.env;

if (env == 'test') {
  client = new Pool({
    host: HOST,
    database: TEST_DATABASE,
    user: USER,
    password: PASSWORD,
    port: 5432,
  });
} else {
  client = new Pool({
    host: HOST,
    database: DATABASE,
    user: USER,
    password: PASSWORD,
    port: 5432,
  });
}

export default client;
