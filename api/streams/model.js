const { Schema, model } = require('mongoose');

const StreamSchema = new Schema({
  url: String
});

module.exports = model('streams', StreamSchema);
