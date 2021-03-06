const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const rw = require('random-words');

const streamRoutes = require('./api/streams/routes');

require('dotenv').config();
const PORT = process.env.PORT || 4000;
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGO_URI || '', options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('db connected'));

express()
  .use(morgan('dev'))
  .use(express.urlencoded({ extended: false }))
  .use(express.json())

  .use(express.static(path.join(__dirname, 'ui')))
  .use(express.static(path.join(__dirname, 'client', 'build')))

  .get('/randomWord', (req, res) => {
    res.json(rw(100));
  })

  .use('/streams', streamRoutes)

  .use('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  })

  .use('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'ui', 'streams.html'));
  })

  .listen(PORT, () => {
    console.info(`🌍 Listening on port ${PORT}`);
  });
