'use strict';

const assert = require('chai').assert;

const stub = require('../src/lib/resHandler').stub;
const controller = require('../src/lib/rover/rover.controller');

suite('lib/rover', () => {
  suite('GET /rover', () => {
    suite('Get starting location and direction of new rover.', () => {
      let actual;

      suiteSetup('', done => {
        controller['/'].get(null, stub(res => {
          actual = res.data;
          done();
        }));
      });

      test('x position should equal 0', () => {
        assert.equal(actual.x, 0);
      });

      test('y position should equal 0', () => {
        assert.equal(actual.y, 0);
      });

      test('direction should equal N', () => {
        assert.equal(actual.direction, 'N');
      });

      test('id should equal 0', () => {
        assert.equal(actual.id, 0);
      });
    });
  });
});
