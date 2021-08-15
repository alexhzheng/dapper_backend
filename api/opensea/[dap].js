/** @format */

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

const dapGenerator = async (req, res) => {
  if (!req.query.dap) {
    return res.send({ error: "Could not get token id" });
  }
  const tokenId = req.query.dap;
  console.log(tokenId);

  const dap = await Dap.findOne({ tokenId });
  if (!dap) {
    return res.send({ error: "Could not fetch dap for token id" });
  }
  console.log("Fetched dap with name: " + dap.name);

  //   const colorName = 'Pantone 19-3952 Surf The Web';
  const dapVideo = "https://cloudflare-ipfs.com/ipfs/" + dap.ipfsImageHash;
  const dapJson = {
    external_url: "http://localhost:3000/dap/" + dap.ipfsImageHash,
    image: dapVideo,
    name: dap.name,
  };
  return res.json(dapJson);
};

module.exports = dapGenerator;
