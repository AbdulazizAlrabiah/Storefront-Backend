import { Product, ProductStore } from '../../model/product';

describe('Product model tests', () => {
  const product1: Product = {
    id: 3,
    name: 'Peanut Butter',
    price: 13.99,
    category: 'Local',
    imageLink: 'https://live.staticflickr.com/8657/15892078650_051c2f1d8c_b.jpg',
    description: 'Yummy'
  };

  const product2: Product = {
    id: 6,
    name: 'Orange',
    price: 12.99,
    category: 'Imported',
    imageLink: 'https://live.staticflickr.com/5445/17521101345_ec6dbc96c1_b.jpg',
    description: 'Good source of vitamin C'
  };

  it('expect to list all products in the database', async () => {
    const products = await ProductStore.listAll();

    // Will check for 3 products existence
    expect(products).toContain(product1);
    expect(products).toContain(product2);
  });

  it('expect to show product with id = 3', async () => {
    const product = await ProductStore.showProductAt(3);

    expect(product).toEqual(product1);
  });
});
