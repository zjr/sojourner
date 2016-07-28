'use strict';

module.exports = {
  '/': {
    get(req, res) {
      res.sjPass('Hello from rover!');
    }
  }
};
