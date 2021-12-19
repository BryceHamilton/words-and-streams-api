const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { MongoClient } = require('mongodb');

require('dotenv').config();
const PORT = process.env.PORT || 4000;
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
express()
  .use(morgan('dev'))
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(express.static(path.join(__dirname, '..', 'build')))
  .use(express.static('public'))

  // hello from server
  .get('/hello', (req, res) => {
    res.status(200).json({ greeting: 'hello from heroku and node 👋' });
  })

  // hello from db
  .get('/streams', async (req, res) => {
    try {
      const client = await new MongoClient(MONGO_URI, options);
      await client.connect();

      const db = client.db('words-streams');
      const streams = await db
        .collection('streams')
        .find()
        .toArray();

      client.close();
      res.status(200).json({ streams });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'something went wrong ☹️' });
    }
  })

  .listen(PORT, () => {
    console.info(`🌍 Listening on port ${PORT}`);
  });
