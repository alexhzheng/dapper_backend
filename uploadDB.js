/** @format */

const dappers = require("./static/daps.json");
const mongoose = require("mongoose");
const config = require("./config/config");
const ObjectID = require("mongodb").ObjectID;

require("./models/mintedDap");
const Dap = mongoose.model("Dap");

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

function getTokenId(name) {
  return name.split("").reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
}

async function main() {
  for (const i in dappers) {
    const name = dappers[i]["name"];
    const tokenId = getTokenId(name);
    const doc = {
      _id: new ObjectID(),
      status: "available",
      hexcode: name,
      tokenId: tokenId.toString(),
      ipfsVideoHash: dappers[i]["ipfsVideoHash"],
      createdDate: new Date(),
      _v: 0,
    };
    conn.collection("daps").insertOne(doc);

    console.log("added");
  }
}
main();
console.log("done");
