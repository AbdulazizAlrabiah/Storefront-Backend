import express from 'express';
import { getAllUsers, getUser, createUser } from './api/userApis';
import { getAllProducts, getProduct } from './api/productApis';
import { getActiveOrder, addProductToOrder, deleteProductFromOrder } from './api/orderApis';
import { authenticate } from '../controller/authentication';

const routes = express.Router();

// User
routes.get('/users', authenticate, getAllUsers);
routes.get('/user/:id', authenticate, getUser);
routes.post('/user', createUser);

// Product
routes.get('/products', getAllProducts);
routes.get('/product/:id', getProduct);

// Order
routes.get('/order', authenticate, getActiveOrder);
routes.post('/order', authenticate, addProductToOrder);
routes.delete('/order', authenticate, deleteProductFromOrder);

export default routes;
