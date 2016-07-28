'use strict';

const _ = require('lodash');

const codes = require('./codes');

const resHandlerProto = {

  appendTokens() {
    this.body.tokens = {
      token: this._headers.token,
      refresh: this._headers.refresh
    };

    return this;
  },

  appendData(data) {
    if (!_.isNull(data) && !_.isUndefined(data)) {
      this.body.data = data;
    }
    return this;
  },

  setCodeAndSendJSON() {
    return this.status(this.body.http_code).json(this.body);
  },

  sjPass(data, next, message) {
    if (message && message.isSojourner) {
      Object.assign(this.body, message);
      return this.appendData(data).setCodeAndSendJSON();
    }

    this.body = codes.x200.success.merge({ next, message }, '*');

    return this
      .appendData(data)
      .appendTokens()
      .setCodeAndSendJSON();
  },

  sjFail(err = {}) {
    if (err.isSojourner) {
      Object.assign(this.body, err);
    } else {
      console.error(err);
      this.body = codes.x500.unknown.mergeOriginal(err);
    }

    return this.setCodeAndSendJSON();
  }

};

// ensures a cleared body
const makeResHandler = function makeResHandler() {
  return Object.assign(resHandlerProto, { body: {} });
};

function middleware(req, res, next) {
  _.bindAll(Object.assign(res, makeResHandler()), ['sjPass', 'sjFail']);
  next();
}

module.exports = {
  middleware,
  stub(fn) {
    const resStub = {
      status() {
        return this;
      },
      json(body) {
        fn(body);
      }
    };
    middleware({}, resStub, () => {});
    return resStub;
  }
};

