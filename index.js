const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const streamRoutes = require('./streams/routes');

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

  .use(express.static(path.join(__dirname, 'client', 'build')))
  // .use(express.static('client', 'public'))

  .use('/streams', streamRoutes)

  .use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  })

  .listen(PORT, () => {
    console.info(`🌍 Listening on port ${PORT}`);
  });
