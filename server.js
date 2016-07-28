'use strict';

const app = require('./src/app');
const config = require('./src/config');

app.listen(config.apiPort, () => sjLog(`Listening at ${config.api}`));
