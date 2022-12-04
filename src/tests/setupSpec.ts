import client from '../database';
import { User } from '../model/user';

const user1: User = {
  id: 1,
  firstName: 'Abdulaziz',
  lastName: 'Alrabiah',
  password: 'Test123',
};

const user2: User = {
  id: 2,
  firstName: 'Abdulaziz2',
  lastName: 'Alrabiah2',
  password: 'Test123',
};

// Inserting users in test db
beforeAll(async () => {
  const con = await client.connect();
  const sql =
    'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3)';
  // Without bcrypt for simplicity
  await con.query(sql, [user1.firstName, user1.lastName, user1.password]);
  await con.query(sql, [user2.firstName, user2.lastName, user2.password]);

  con.release();
});
