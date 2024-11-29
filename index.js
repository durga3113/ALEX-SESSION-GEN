const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const server = require('./qr');
const code = require('./pair');
require('events').EventEmitter.defaultMaxListeners = 500;

const app = express();
const __path = process.cwd();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/qr', server);
app.use('/code', code);
app.use('/qrweb', (req, res) => {
  res.sendFile(path.join(__path, 'qr.html'));
});
app.use('/pair', (req, res) => {
  res.sendFile(path.join(__path, 'pair.html'));
});
app.use('/', (req, res) => {
  res.sendFile(path.join(__path, 'main.html'));
});

// Export the app as a module for Vercel
module.exports = app;
