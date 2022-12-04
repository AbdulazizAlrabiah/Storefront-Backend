import express from 'express';
import { validateNotEmptyOrNull } from '../../controller/validator';
import { ProductStore } from '../../model/product';

export async function getAllProducts(
  req: express.Request,
  res: express.Response
): Promise<void> {
  try {
    const products = await ProductStore.listAll();
    res.status(200).json(products);
  } catch {
    res.status(500).send('Server error, please try again');
  }
}

export async function getProduct(
  req: express.Request,
  res: express.Response
): Promise<void> {
  try {
    const product = await ProductStore.showProductAt(
      parseInt(req.params['id'] as string)
    );

    if (validateNotEmptyOrNull(product?.id)) {
      res.status(200).json(product);
    } else {
      res.status(404).json('Product not found');
    }
  } catch {
    res.status(500).send('Server error, please try again');
  }
}
