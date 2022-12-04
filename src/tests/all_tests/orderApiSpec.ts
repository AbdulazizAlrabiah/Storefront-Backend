import bodyParser from 'body-parser';
import express from 'express';
import supertest from 'supertest';
import { authenticate } from '../../controller/authentication';
import { addProductToOrder, getActiveOrder } from '../../routes/api/orderApis';
import { token } from './userApiSpec';

const app = express();

app.use(bodyParser.json());

app.get('/api/order', authenticate, getActiveOrder);
app.post('/api/order', authenticate, addProductToOrder);

describe('Order endpoint tests', () => {
  it('expect to add 2 products to a user with id = 3 from endpoint', async () => {
    const headers = {
      Authorization: token,
    };

    const body = { productId: 6, quantity: 3 };
    const body2 = { productId: 5, quantity: 1 };

    const result = await supertest(app)
      .post('/api/order')
      .set(headers)
      .send(body)
      .expect(200);

    const result2 = await supertest(app)
      .post('/api/order')
      .set(headers)
      .send(body2)
      .expect(200);

    expect(result.text).toBeTruthy();
    expect(result2.text).toBeTruthy();
  });

  it('expect to get the current active order for a user with id = 3 from endpoint', async () => {
    const headers = {
      Authorization: token,
    };

    const result = await supertest(app)
      .get('/api/order')
      .set(headers)
      .expect(200);

    console.log(result.text);

    expect(result.text).toBeTruthy();
  });
});
