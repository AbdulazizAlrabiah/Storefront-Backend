import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const env = process.env.Env;

let client: Pool;

const {
    HOST,
    DATABASE,
    TEST_DATABASE,
    PASSWORD,
} = process.env;

if (env == "test") {
    client = new Pool({
        host: HOST,
        database: TEST_DATABASE,
        password: PASSWORD,
        port: 5432,
    });
} else {
    client = new Pool({
        host: HOST,
        database: DATABASE,
        password: PASSWORD,
        port: 5432,
    });
}

export default client;