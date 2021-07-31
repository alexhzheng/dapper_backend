/** @format */

const mongoose = require('mongoose');

const dapSchema = new mongoose.Schema(
  {
    tokenId: { type: String },
    name: { type: String },
    ipfsVideoHash: { type: String },
    minterAddress: { type: String },
    status: {
      type: String,
      enum: ['claimed', 'available'],
      default: 'available',
    },
    createdDate: { type: Date, default: Date.now },
  },
  { collection: 'daps' }
);

const Dap = mongoose.model('Dap', dapSchema);

module.exports = Dap;
