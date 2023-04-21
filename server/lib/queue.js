'use strict';

class Queue {
  constructor() {
    this.data = {};
  }

  store(key, value) {
    this.data[key] = value;
    console.log('Added to the queue');
    return key;
  }

  read(key) {
    return this.data[key];
  }

  remove(key) {
    console.log('Removed from the queue');
    let value = this.data[key];
    delete this.data[key];
    return value;
  }
}

module.exports = Queue;
