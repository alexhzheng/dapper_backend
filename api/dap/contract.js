/** @format */

const contract = require("../../static/Dapper.json");

const fetchContract = (req, res) => {
  return res.send(contract);
};

module.exports = fetchContract;
