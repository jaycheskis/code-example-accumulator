const mongoose = require('mongoose');
const URI = require('./uri.js');

const MONGO_URI = URI;

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'methods'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const methodSchema = new Schema({
  class: String,
  name: String,
  mdn_example: String,
  w3_example: String
});

const Method = mongoose.model('method', methodSchema);


module.exports = Method;