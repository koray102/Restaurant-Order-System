// src/services/__tests__/orderService.test.js
import { submitOrder } from '../orderService';
import axios from 'axios';

jest.mock('axios'); // Axios mock'u

describe('submitOrder', () => {
  beforeEach(() => {
    global.localStorage.clear();
    global.localStorage.setItem = jest.fn();
    global.localStorage.getItem = jest.fn(() => '[]');
    global.localStorage.removeItem = jest.fn();
  });

  it('should save order to localStorage on success', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
        ok: true
      })
    );

    const order = {
      location: 'Bornova',
      tableNumber: '1',
      note: '',
      cardInfo: '1234-5678',
      cart: [{ name: 'Pizza', price: 50 }]
    };

    const result = await submitOrder(order);

    expect(result.success).toBe(true);
    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      'orders',
      expect.any(String)
    );
    expect(global.localStorage.removeItem).toHaveBeenCalledWith('cart_Bornova');
  });
});
