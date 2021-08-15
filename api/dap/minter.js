const mongoose = require("mongoose");
const config = require("../../config/config");

require("../../models/mintedDap");

const Dap = mongoose.model("Dap");

// sync db
mongoose
  .connect(config.dbConnection, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err.reason));

const minter = async (req, res) => {
  if (!req.body || !req.body.minter) {
    return res.send({ error: "dap not provided" });
  }
  const minterAddress = req.body.minter;
  const dap = await Dap.findOne({ minterAddress });
  if (!dap) {
    return res.send({ error: "Could not fetch dap for token id" });
  }
  console.log("Fetched dap with name: " + dap.name);

  const dapId = {
    tokenId: dap.tokenId,
  };
  return res.send({ dap: dapId });
};

module.exports = minter;
