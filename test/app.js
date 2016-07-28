'use strict';

const assert = require('chai').assert;
const request = require('supertest');

const app = require('../src/app.js');

let mock;

suite('app.js', () => {
  setup(done => {
    mock = app.listen(0, () => done());
  });

  test('should return 200 for OPTIONS req.', done => {
    request(mock)
      .options('/')
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        const exp = 'OK';
        const act = res.text;
        assert.equal(act, exp);
        return done();
      });
  });

  test('should get answering machine for GET req.', done => {
    request(mock)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        const exp = app.get('answeringMachine');
        const act = res.text;
        assert.equal(act, exp);
        return done();
      });
  });

  teardown(done => {
    mock.close(done);
  });
});
