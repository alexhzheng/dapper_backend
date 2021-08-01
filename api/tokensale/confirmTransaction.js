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

const transactionConfirmer = async (req, res) => {
  console.log(req.body);
  if (!req.body || !req.body.dapTokenIds || !req.body.status) {
    return res.send({ error: 'Invalid request missing parameters' });
  }
  const colorTokenIds = req.body.dapTokenIds;
  const status = req.body.status;
  const validStatus = status == 'claimed' || status == 'available';
  if (!validStatus) {
    return res.send({ error: 'Invalid status confirmation' });
  }

  if (status == 'claimed') {
    const minterAddress = req.body.minterAddress;
    const result = await Dap.updateOne(
      { tokenId: dapTokenIds },
      { $set: { status: status, minterAddress: minterAddress } }
    );
    if (!result) {
      return res.send({ error: 'Failed to update dap confirmations' });
    }
    console.log('result: ', result);
  } else if (status == 'available') {
    if (!result) {
      return res.send({ error: 'Failed to update dap confirmations' });
    }
    console.log('result: ', result);
  }

  return res.send({ success: true });
};

module.exports = transactionConfirmer;
