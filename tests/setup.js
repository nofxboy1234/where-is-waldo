import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { setupServer } from 'msw/node';
import { HttpResponse, delay, http } from 'msw';

expect.extend(matchers);

const products = [
  {
    id: 1,
    image: '',
    title: 'a product',
    price: 99.99,
    quantity: 0,
  },
];

export const restHandlers = [
  http.get('https://fakestoreapi.com/products', async () => {
    // Wait for 500ms before responding.
    await delay(500);

    return HttpResponse.json(products);
  }),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

export { server, http, delay, HttpResponse };
