/** @format */

const dapperDescription = (req, res) => {
  const dap = {
    name: 'Dapper',
    description:
      'Dapper ($DAP) is a meta-NFT handshake gif collectible based on Ethereum Layer 2 Polygon (Matic).',
    image: 'http://localhost:3000/static/imgHandshake.png',
    external_link: '',
    seller_fee_basis_points: 250, // Indicates a 2.5% seller fee.
    fee_recipient: '0x6d0bFC469Adb18f6C7f2ccE56036b81060d2aa7A', // Where seller fees will be paid to.
  };
  return res.json(dap);
};

module.exports = dapperDescription;
