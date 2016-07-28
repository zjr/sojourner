'use strict';

const assert = require('chai').assert;

const stub = require('../src/lib/resHandler').stub;
const controller = require('../src/lib/rover/rover.controller');

const makeRotateReq = (id, direction) => ({ params: { id }, query: { direction } });

suite('lib/rover', () => {
  suite('GET /rover', () => {
    suite('Get starting location and direction of new rover.', () => {
      let actual;

      suiteSetup('get a new rover', done => {
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
    let rover;

    suiteSetup('get a new rover', done => {
      controller['/'].get(null, stub(res => {
        rover = res.data;
        done();
      }));
    });

    suite('rotate the rover right to east', () => {
      let actual;

      suiteSetup('rotate rover right', done => {
        controller['/rotate'].put(makeRotateReq(rover.id, 'right'), stub(res => {
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

      suiteSetup('rotate rover right', done => {
        controller['/rotate'].put(makeRotateReq(rover.id, 'right'), stub(res => {
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

      suiteSetup('rotate rover right', done => {
        controller['/rotate'].put(makeRotateReq(rover.id, 'right'), stub(res => {
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

      suiteSetup('rotate rover right', done => {
        controller['/rotate'].put(makeRotateReq(rover.id, 'right'), stub(res => {
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

      suiteSetup('rotate rover left', done => {
        controller['/rotate'].put(makeRotateReq(rover.id, 'left'), stub(res => {
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
