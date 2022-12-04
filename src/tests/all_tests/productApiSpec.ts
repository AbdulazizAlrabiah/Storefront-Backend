import bodyParser from 'body-parser';
import express from 'express';
import supertest from 'supertest';
import { getAllProducts, getProduct } from '../../routes/api/productApis';

const app = express();

app.use(bodyParser.json());

app.get('/api/products', getAllProducts);
app.get('/api/product/:id', getProduct);

describe('Product endpoint tests', () => {
  it('expect to get and list all products from endpoint', async () => {
    const result = await supertest(app).get('/api/products').expect(200);

    console.log(result.text);

    expect(result.text).toBeTruthy();
  });

  it('expect to get the product with id = 3 from endpoint', async () => {
    const result = await supertest(app).get('/api/product/3').expect(200);

    console.log(result.text);

    expect(result.text).toBeTruthy();
  });
});
