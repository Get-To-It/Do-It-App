'use strict';

const broHandler = require('./broHandler.js');

jest.mock('../../eventPool', () => {
  return {
    emit: jest.fn(),
  };
});

console.log = jest.fn();

describe('task-ready event', () => {
  test('event should emit', () => {
    const payload = {
      event: 'task-ready',
      time: new Date(),
      payload: {
        creator: 'Dad',
        taskId: '147258369',
        task: 'Vacuum',
        target: 'Living Room',
      },
    };

    broHandler(payload);
    expect(eventPool.emit).toString('in-progress', payload);
  });
});
