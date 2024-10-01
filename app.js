const express = require('express');
const path = require('node:path');
require('dotenv').config();

const app = express();

// Express config
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set app router
const router = require('./routes/router.js');
app.use(router);

// serve app
app.listen(PORT, HOST, () => {
  console.log('*************************');
  console.log(`>>> Listening on http://${HOST}:${PORT}`);
  console.log('*************************');
});
