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

const allDaps = async (req, res) => {
  const daps = await Dap.find();
  if (!daps) {
    return res.send({ error: "Could not retrieve daps" });
  }
  const allDaps = daps.map((x) => {
    let dap = {
      name: x.name,
      ipfsVideoHash: x.ipfsVideoHash,
    };
    return dap;
  });
  console.log(allDaps);
  return res.send({ daps: allDaps });
};

module.exports = allDaps;
