'use strict';

process.env.DEBUG = process.env.DEBUG || 'sj:*';

const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const morgan = require('morgan');
const debug = require('debug');

const resHandler = require('./lib/resHandler');

global.sjLog = debug('sj:main');
global.sjHttpLog = debug('sj:http');

console.strace = function strace(err) {
  /* eslint no-console: 0 */
  if (!err.stack) { return console.trace(err); }
  return console.strace(err.stack);
};

const app = express();

app.use(compress());
app.use(bodyParser.json());
app.use(morgan('dev', { stream: { write(str) { sjHttpLog(str.trim()); } } }));

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(resHandler.middleware);

app.set('answeringMachine', 'You\'ve reached the Sojourner API, please leave a message.');
app.use(/^\/$/, (req, res) => res.send(app.get('answeringMachine')));

module.exports = app;
