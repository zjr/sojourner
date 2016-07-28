'use strict';

const _ = require('lodash');

const codeProto = {

  http_code: 0,
  isSojourner: true,

  setHttpCode: function setHttpCode(code) {
    this.http_code = code;
    return this;
  },

  merge: function mergeCode(obj, fields) {
    const _fields = fields === undefined ? 'message' : fields;
    const _obj = fields !== '*' ? _.pick(obj, _fields) : obj;
    return Object.assign(Object.create(codeProto), this, _obj);
  },

  mergeOriginal: function mergeCodeWithOriginal(err) {
    let original;
    if (err instanceof Error) {
      original = {
        stack: err.stack,
        message: err.message
      };
    } else {
      original = err;
    }
    return Object.assign(Object.create(codeProto), this, { original });
  }

};

const makeCode = function makeCode(opts) {
  return Object.assign(Object.create(codeProto), opts);
};

const codes = {
  x200: {
    success: makeCode({
      code: 100
    })
  },
  x250: {
    // 250 == Deprecated
    success: makeCode({
      code: 100
    })
  },
  x400: {},
  x401: {},
  x410: {},
  x500: {
    unknown: makeCode({
      code: 100,
      message: 'An unknown error has occurred.'
    }),
    obstacle: makeCode({
      code: 101,
      message: 'An obstacle was encountered and rover was stopped.'
    })
  }
};

_.forIn(codes, (subCodes, httpCode) => {
  const code = parseInt(httpCode.match(/\d+/).shift(), 10);
  _.forIn(subCodes, subCode => {
    subCode.setHttpCode(code);
  });
});

module.exports = codes;

