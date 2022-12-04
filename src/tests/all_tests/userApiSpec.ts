import bodyParser from 'body-parser';
import express from 'express';
import supertest from 'supertest';
import { authenticate } from '../../controller/authentication';
import { createUser, getAllUsers, getUser } from '../../routes/api/userApis';

const app = express();

app.use(bodyParser.json());

app.get('/api/users', authenticate, getAllUsers);
app.get('/api/user/:id', authenticate, getUser);
app.post('/api/user', createUser);

export let token = '';

describe('User endpoint tests', () => {
  it('expect to create a user from endpoint', async () => {
    const body = {
      firstName: 'Abdulaziz3',
      lastName: 'Alrabiah3',
      password: 'Test123',
    };

    const result = await supertest(app)
      .post('/api/user')
      .send(body)
      .expect(200);

    token = result.text.replace(/"/g, '');

    expect(result.text).toBeTruthy();
  });

  it('expect to get and list all users from endpoint', async () => {
    const headers = {
      Authorization: token,
    };

    const result = await supertest(app)
      .get('/api/users')
      .set(headers)
      .expect(200);

    console.log(result.text);

    expect(result.text).toBeTruthy();
  });

  it('expect to get the user with id = 1 from endpoint', async () => {
    const headers = {
      Authorization: token,
    };

    const result = await supertest(app)
      .get('/api/user/1')
      .set(headers)
      .expect(200);

    console.log(result.text);

    expect(result.text).toBeTruthy();
  });
});
