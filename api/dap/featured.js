/** @format */

const featured = require('../../static/featured.json');

const fetchFeatured = (req, res) => {
  return res.send(featured);
};

module.exports = fetchFeatured;
