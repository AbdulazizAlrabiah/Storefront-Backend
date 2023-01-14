import express from 'express';
import { validateNotEmptyOrNull } from '../../controller/validator';
import { Order, OrderStore } from '../../model/order';

export async function getActiveOrder(
  req: express.Request,
  res: express.Response
): Promise<void> {
  try {
    const order = await OrderStore.showOrderAt(parseInt(req.body.userId));

    if (validateNotEmptyOrNull(order?.id)) {
      res.status(200).json(order);
    } else {
      res.status(404).json("You haven't made an order yet");
    }
  } catch {
    res.status(500).send('Server error, please try again');
  }
}

export async function addProductToOrder(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const productId = parseInt(req.body['productId']);
  const quantity = parseInt(req.body['quantity']);

  if (!validateNotEmptyOrNull(productId, quantity)) {
    res
      .status(400)
      .send('Please enter all the required fields (productId and quantity)');
    return;
  }

  console.log(req.body.userId);

  try {
    const orderId = await OrderStore.addProductToOrder(
      req.body.userId,
      productId,
      quantity
    );
    res.json(orderId).status(200);
  } catch {
    res.status(500).json('Server error, please try again');
  }
}

export async function deleteProductFromOrder(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const productId = parseInt(req.body['productId']);

  if (!validateNotEmptyOrNull(productId)) {
    res
      .status(400)
      .send('Please enter the required field (productId)');
    return;
  }

  console.log(req.body.userId);

  try {
    const product = await OrderStore.deleteProductFromOrder(
      req.body.userId,
      productId
    );
    res.json(product).status(200);
  } catch {
    res.status(500).json('Server error, please try again');
  }
}
