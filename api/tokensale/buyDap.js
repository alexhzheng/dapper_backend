/** @format */

const mongoose = require('mongoose');
const config = require('../../config/config');

require('../../models/mintedDap');

const Color = mongoose.model('Dap');

// sync db
mongoose
  .connect(config.dbConnection, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err.reason));

const dapBuyer = async (req, res) => {
  if (!req.body || !req.body.dap) {
    return res.send({ error: 'dap not provided' });
  }

  Color.find({ name: dap })
    .then(function (data) {
      const dapTokenIds = data.map((x) => x.tokenId);
      return res.send({ daps: dapTokenIds });
    })
    .catch(function (err) {
      return res.send({ error: err.message });
    });
};
module.exports = dapBuyer;
