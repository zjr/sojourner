'use strict';

const express = require('express');
const router = new express.Router();

const controller = require('./rover.controller');

router.get('/', controller['/'].get);

router.put('/:id/rotate', controller['/rotate'].put);

router.put('/:id/move', controller['/move'].put);

module.exports = router;
