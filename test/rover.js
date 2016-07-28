'use strict';

const assert = require('chai').assert;

const stub = require('../src/lib/resHandler').stub;
const controller = require('../src/lib/rover/rover.controller');

const makerotateQuery = direction => ({ query: direction });

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

  suite('PUT /rover/:id/rotate', () => {
    suite('rotate the rover right to east', () => {
      let actual;

      suiteSetup('', done => {
        controller['/rotate'].put(makerotateQuery('right'), stub(res => {
          actual = res.data;
          done();
        }));
      });

      test('direction should equal E', () => {
        assert.equal(actual.direction, 'E');
      });
    });

    suite('rotate the rover right to south', () => {
      let actual;

      suiteSetup('', done => {
        controller['/rotate'].put(makerotateQuery('right'), stub(res => {
          actual = res.data;
          done();
        }));
      });

      test('direction should equal S', () => {
        assert.equal(actual.direction, 'S');
      });
    });

    suite('rotate the rover right to west', () => {
      let actual;

      suiteSetup('', done => {
        controller['/rotate'].put(makerotateQuery('right'), stub(res => {
          actual = res.data;
          done();
        }));
      });

      test('direction should equal W', () => {
        assert.equal(actual.direction, 'W');
      });
    });

    suite('rotate the rover right to north', () => {
      let actual;

      suiteSetup('', done => {
        controller['/rotate'].put(makerotateQuery('right'), stub(res => {
          actual = res.data;
          done();
        }));
      });

      test('direction should equal N', () => {
        assert.equal(actual.direction, 'N');
      });
    });

    suite('rotate the rover left back to west', () => {
      let actual;

      suiteSetup('', done => {
        controller['/rotate'].put(makerotateQuery('left'), stub(res => {
          actual = res.data;
          done();
        }));
      });

      test('direction should equal W', () => {
        assert.equal(actual.direction, 'W');
      });
    });
  });
});
