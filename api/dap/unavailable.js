/** @format */

const mongoose = require('mongoose');
const config = require('../../config/config');

require('../../models/mintedDap');

const Dap = mongoose.model('Dap');

// sync db
mongoose
  .connect(config.dbConnection, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err.reason));

const unavailableDaps = async (req, res) => {
  const daps = await Dap.find({
    status: { $in: ['claimed'] },
  }).select('name');
  if (!daps) {
    return res.send({ error: 'Could not retrieve daps' });
  }
  const unavailable = daps.map((x) => x.name);
  return res.send({ daps: unavailable });
};

module.exports = unavailableDaps;
