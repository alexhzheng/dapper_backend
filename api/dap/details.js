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
