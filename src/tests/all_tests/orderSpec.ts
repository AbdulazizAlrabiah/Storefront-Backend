import { OrderStore } from '../../model/order';

describe('User model tests', () => {
  it('expect to create a new product for user with id = 1', async () => {
    const orderId = await OrderStore.addProductToOrder(1, 5, 2);

    expect(orderId).toBeTruthy();
  });

  it('expect to show the order for the user with id = 1', async () => {
    const order = await OrderStore.showOrderAt(1);

    expect(order?.userId).toEqual(1);
    expect(order?.products[0].product.id).toEqual(5);
  });
});
