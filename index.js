const express = require('express');
const morgan = require('morgan');
const { MongoClient } = require('mongodb');

require('dotenv').config();
nv;
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

  // hello from server
  .get('/hello', (req, res) => {
    res.status(200).json({ greeting: 'hello from heroku and node 👋' });
  })

  // hello from db
  .get('/greeting', async (req, res) => {
    try {
      const client = await MongoClient(MONGO_URI, options);
      await client.connect();

      const db = client.db('research-stream');
      const { greeting } = await db
        .collection('greetings')
        .findOne({ type: 'hello' });

      client.close();
      res.status(200).json({ greeting });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'something went wrong ☹️' });
    }
  })

  .listen(PORT, () => {
    console.info(`🌍 Listening on port ${PORT}`);
  });
