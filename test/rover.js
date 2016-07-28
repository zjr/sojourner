'use strict';

const assert = require('chai').assert;

const stub = require('../src/lib/resHandler').stub;
const controller = require('../src/lib/rover/rover.controller');

suite('lib/rover', () => {
  suite('GET /user', () => {
    suite('Check in', () => {
      let actual;

      suiteSetup('', done => {
        controller['/'].get(null, stub(res => {
          actual = res;
          done();
        }));
      });

      test('should get simple string data', () => {
        assert.equal(actual.data, 'Hello from rover!');
      });

    });
  });
});
