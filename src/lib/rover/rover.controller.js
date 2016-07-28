'use strict';

const roverProto = {
  x: 0,
  y: 0,
  direction: 'N'
};

// TODO… storing these in memory isn't really sustainable (but it is simple).
const rovers = [];

module.exports = {
  '/': {
    get(req, res) {
      const rover = Object.assign({}, roverProto, { id: rovers.length });
      res.sjPass(rover);
    }
  }
};
