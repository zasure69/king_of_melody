class Semaphore {
  constructor(initialCount) {
    this.count = initialCount;
    this.queue = [];
  }

  acquire() {
    return new Promise((resolve) => {
      if (this.count > 0) {
        this.count--;
        resolve();
      } else {
        this.queue.push(resolve);
      }
    });
  }

  release() {
    if (this.queue.length > 0) {
      const resolve = this.queue.shift();
      resolve();
    } else {
      this.count++;
    }
  }
}

  module.exports = new Semaphore;