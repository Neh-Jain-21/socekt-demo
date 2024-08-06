const cors = require('cors');
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');

const httpServer = createServer();

const app = express();
const socketHelper = require('./socketHelper');

socketHelper(httpServer);

app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

httpServer.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
