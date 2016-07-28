'use strict';

const fs = require('fs');
const path = require('path');
const baseCfg = require('./base');

const envs = fs.readdirSync(path.join(__dirname, './envs')).map(env => env.replace('.js', ''));

// TODO: build step not currently necessary…
function build(APP_ENV = process.env.APP_ENV || 'dev') {
  if (!envs.includes(APP_ENV)) {
    return new Error(`APP_ENV "${APP_ENV}" is not allowed.`);
  }

  const envCfg = require(`./envs/${APP_ENV}`);

  return Object.freeze(Object.assign({}, baseCfg, envCfg));
}

module.exports = build();
