'use strict';

// const eventPool = require('../eventPool');
const socket = require('../../socket');
const handler = require('./handler');
//const orderDeliver = require('./handler');
const { taskGenerate, taskComplete } = require('../dadHandler.js');

jest.mock('../../socket.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

console.log = jest.fn();

describe('Dad Handler', () => {
  test('event should emit', () => {
    const payload = {
      deliveryCompany: 'Arkham Delivery',
      orderId: '147258369',
      customer: 'Bruce Wayne',
      address: 'Gotham City',
    };

    orderDeliver(payload);
    expect(socket.emit).toString('in-progress', payload);
  });
});
