import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

let client: Pool;

const { ENV, HOST, DATABASE, TEST_DATABASE, USER, PASSWORD, PROD_DB_HOST, PROD_DB_NAME, PROD_DB_USER, PROD_DB_PASS } = process.env;

if (ENV == 'prod') {
  client = new Pool({
    host: PROD_DB_HOST,
    database: PROD_DB_NAME,
    user: PROD_DB_USER,
    password: PROD_DB_PASS,
    port: 5432,
  });
} else if (ENV == 'test') {
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
