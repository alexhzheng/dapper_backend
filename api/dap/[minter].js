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
  if (!req.query.minter) {
    return res.send({ error: "Could not get minter" });
  }
  const minterAddress = req.query.minter;
  console.log(minterAddress);

  const dap = await Dap.findOne({ minterAddress });
  if (!dap) {
    return res.send({ error: "Could not fetch dap for token id" });
  }
  console.log("Fetched dap with name: " + dap.name);

  const tokenId = {
    tokenId: dap.tokenId,
  };
  return res.send({ dap: tokenId });
};

module.exports = minter;
