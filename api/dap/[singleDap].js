const mongoose = require("mongoose");
const config = require("../../config/config");

require("../../models/mintedDap");

const Dap = mongoose.model("Dap");

mongoose
  .connect(config.dbConnection, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err.reason));

const singleDap = async (req, res) => {
  if (!req.query.singleDap) {
    return res.send({ error: "Could not get token hash" });
  }
  const ipfsVideoHash = req.query.singleDap;
  console.log(ipfsVideoHash);

  const dap = await Dap.findOne({ ipfsVideoHash });
  if (!dap) {
    return res.send({ error: "Could not fetch dap for token id" });
  }
  console.log("Fetched dap with name: " + dap.name);

  const dapJson = {
    name: dap.name,
    ipfsVideoHash: dap.ipfsVideoHash,
    status: dap.status,
    tokenId: dap.tokenId,
  };
  return res.send({ dap: dapJson });
};

module.exports = singleDap;
