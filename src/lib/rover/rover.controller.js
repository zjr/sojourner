'use strict';

const roverProto = {
  x: 0,
  y: 0,
  direction: 'N'
};

// TODO… storing these in memory isn't really sustainable (but it is simple).
const rovers = [];

const findRover = id => rovers.find(x => x.id === id);

// TODO: probably simpler with a map of numbers to cardinals and to use arithmetic.
const rotateRover = (rover, direction) => {
  switch (direction) {
    case 'right':
      switch (rover.direction) {
        case 'N':
          rover.direction = 'E';
          break;
        case 'E':
          rover.direction = 'S';
          break;
        case 'S':
          rover.direction = 'W';
          break;
        case 'W':
          rover.direction = 'N';
          break;
        default:
          // error case
          break;
      }
      break;
    case 'left':
      switch (rover.direction) {
        case 'N':
          rover.direction = 'W';
          break;
        case 'W':
          rover.direction = 'S';
          break;
        case 'S':
          rover.direction = 'E';
          break;
        case 'E':
          rover.direction = 'N';
          break;
        default:
          // error case
          break;
      }
      break;
    default:
      // error case
      break;
  }
  return rover;
};

const findAndRotateRover = (id, direction) => rotateRover(findRover(id), direction);

module.exports = {
  '/': {
    get(req, res) {
      const rover = Object.assign({}, roverProto, { id: rovers.length });
      rovers.push(rover);
      res.sjPass(rover);
    }
  },
  '/rotate': {
    put(req, res) {
      res.sjPass(findAndRotateRover(req.params.id, req.query.direction));
    }
  },
  '/move': {
    put(req, res) {
      res.sjPass('');
    }
  }
};
