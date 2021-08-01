/** @format */

const nbaColors = require('./static/nbaColors.json');
const mongoose = require('mongoose');
const config = require('./config/config');
const ObjectID = require('mongodb').ObjectID;

require('./models/mintedColor');
const Color = mongoose.model('Color');

// // sync db
mongoose
  .connect(config.dbConnection, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => console.log(err.reason));

const conn = mongoose.connection;

function formatColor(colorHex) {
  return parseInt(colorHex, 16);
}

async function main() {
  for (const i in nbaColors) {
    const hexcode = nbaColors[i];
    const tokenId = formatColor(hexcode);
    const doc = {
      _id: new ObjectID(),
      status: 'available',
      hexcode: nbaColors[i],
      tokenId: tokenId.toString(),
      createdDate: new Date(),
      _v: 0,
    };
    conn.collection('colors').insertOne(doc);

    console.log('added');
  }
}
main();
console.log('done');
