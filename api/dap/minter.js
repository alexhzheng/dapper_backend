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
  if (!req.body || !req.body.id) {
    return res.send({ error: "dap not provided" });
  }
  Dap.find({ tokenId: req.body.id })
    .then(function (data) {
      const dapMinter = data.map((x) => x.minterAddress);
      return res.send({ daps: dapMinter });
    })
    .catch(function (err) {
      return res.send({ error: err.message });
    });
};

module.exports = minter;
