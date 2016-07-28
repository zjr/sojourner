'use strict';

const gridMax = 4;

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
const overMax = coord => coord >= gridMax;

const moveRover = (rover, direction) => {
  switch (rover.direction) {
    case 'N':
      rover.y = isForward(direction) ? rover.y + 1 : rover.y - 1;
      break;
    case 'S':
      rover.y = !isForward(direction) ? rover.y + 1 : rover.y - 1;
      break;
    case 'E':
      rover.x = isForward(direction) ? rover.x + 1 : rover.x - 1;
      break;
    case 'W':
      rover.x = !isForward(direction) ? rover.x + 1 : rover.x - 1;
      break;
    default:
      // error case
      break;
  }
  if (rover.y > gridMax) {
    rover.y = 0;
  } else if (rover.x > gridMax) {
    rover.x = 0;
  } else if (rover.x === -1) {
    rover.x = gridMax;
  } else if (rover.y === -1) {
    rover.y = gridMax;
  }
  return rover;
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
      res.sjPass(findAndRotateRover(req.params.id, req.query.direction));
    }
  },
  '/move': {
    put(req, res) {
      res.sjPass(findAndMoveRover(req.params.id, req.query.direction));
    }
  },
  '/cmd-queue': {
    put(req, res) {
      res.sjPass(findAndExecCmdQueue(req.params.id, req.body.cmds));
    }
  }
};
