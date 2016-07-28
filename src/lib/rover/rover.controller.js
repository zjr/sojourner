'use strict';

const codes = require('../resHandler/codes');

const gridMax = 4;
const obstaclePoint = { x: 3, y: 0 };

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

const isForward = direction => direction === 'forward';

const checkObstacle = (rover, coords) => {
  if (coords.x === obstaclePoint.x && coords.y === obstaclePoint.y) {
    const message = `Obstacle encountered at ${coords.x}, ${coords.y}`;
    throw codes.x500.obstacle.merge({ message });
  }
  return Object.assign(rover, coords);
};

const moveRover = (rover, direction) => {
  const coords = { x: rover.x, y: rover.y };
  switch (rover.direction) {
    case 'N':
      coords.y = isForward(direction) ? coords.y + 1 : coords.y - 1;
      break;
    case 'S':
      coords.y = !isForward(direction) ? coords.y + 1 : coords.y - 1;
      break;
    case 'E':
      coords.x = isForward(direction) ? coords.x + 1 : coords.x - 1;
      break;
    case 'W':
      coords.x = !isForward(direction) ? coords.x + 1 : coords.x - 1;
      break;
    default:
      // error case
      break;
  }
  if (coords.y > gridMax) {
    coords.y = 0;
  } else if (coords.x > gridMax) {
    coords.x = 0;
  } else if (coords.x === -1) {
    coords.x = gridMax;
  } else if (coords.y === -1) {
    coords.y = gridMax;
  }
  return checkObstacle(rover, coords);
};

const cmdMap = {
  m: moveRover,
  move: moveRover,
  r: rotateRover,
  rotate: rotateRover
};

const execCmdQueue = (rover, cmds) => {
  if (!cmds || !cmds.length) { return rover; }
  const cmd = cmds.shift();
  return execCmdQueue(cmdMap[cmd.cmd](rover, cmd.value), cmds);
};

const findAndRotateRover = (id, direction) => rotateRover(findRover(id), direction);
const findAndMoveRover = (id, direction) => moveRover(findRover(id), direction);
const findAndExecCmdQueue = (id, cmds) => execCmdQueue(findRover(id), cmds);

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
      let result;
      try {
        result = findAndRotateRover(parseInt(req.params.id, 10), req.query.direction);
      } catch (e) {
        return res.sjFail(e);
      }
      return res.sjPass(result);
    }
  },
  '/move': {
    put(req, res) {
      let result;
      try {
        result = findAndMoveRover(parseInt(req.params.id, 10), req.query.direction);
      } catch (e) {
        return res.sjFail(e);
      }
      return res.sjPass(result);
    }
  },
  '/cmd-queue': {
    put(req, res) {
      let result;
      try {
        result = findAndExecCmdQueue(parseInt(req.params.id, 10), req.body.cmds);
      } catch (e) {
        return res.sjFail(e);
      }
      return res.sjPass(result);
    }
  }
};
