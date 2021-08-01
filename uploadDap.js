/** @format */

const mongoose = require('mongoose');
const config = require('./config/config');
const nbaColors = require('./static/nbaColors.json');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const pinataApiKey = '8d36eefc72e3b3f6159f';
const pinataSecretApiKey =
  '4aa923ef42d23246af2be98e87579784a4d2d607feaf43508c3f25b3ca81c97f';
require('./models/mintedColor');
const Color = mongoose.model('Color');

// // sync db
mongoose
  .connect(config.dbConnection, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => console.log(err.reason));

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function uploadColor(imgData, color) {
  return new Promise((resolve, reject) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    var data = new FormData();
    const array = imgData.split(',');
    const base64FileData =
      array.length > 1 && array[0].indexOf('base64') >= 0 ? array[1] : array[0];
    const fileData = Buffer.from(base64FileData, 'base64');
    data.append('file', fileData, 'anonymous');
    axios
      .post(url, data, {
        maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
        headers: {
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      })
      .then(async function (response) {
        //handle response here
        console.log('response: ' + response.data.IpfsHash);
        const ipfshash = response.data.IpfsHash;
        console.log('ipfs: ' + ipfshash);

        const dbColor = await Color.findOneAndUpdate(
          { hexcode: color },
          { ipfsImageHash: ipfshash },
          { returnOriginal: false }
        );
        if (!dbColor) {
          console.log('error: ');
        }
        console.log(
          'updated color: ' + dbColor.tokenId + ' ' + dbColor.ipfsImageHash
        );
        resolve(dbColor);
      })
      .catch(function (error) {
        //handle error here
        console.log('error: ' + error);
        reject(error);
      });
  });
}
async function main() {
  // const provider = new HDWalletProvider(
  //    MNEMONIC,
  //    "https://matic-mumbai.chainstacklabs.com"
  //  );
  //  const web3Instance = new web3(provider);
  if (true) {
    // const nftContract = new web3Instance.eth.Contract(
    //   NFT_ABI,
    //   NFT_CONTRACT_ADDRESS,
    //   { gasLimit: "500000" }
    // );

    //magic
    for (const color in nbaColors) {
      const colorData = nbaColors[color];
      console.log('color: ' + color);
      const hash = await uploadColor(colorData, color);
      await timer(500); // then the created Promise can be awaited
      // const result = await nftContract.methods
      //   .reserveGiveaway([web3.utils.toBN(16777215)], addressToSendTo)
      //   .send({ from: OWNER_ADDRESS });
      // console.log("Minted color. Transaction: " + result.transactionHash);
    }
  } else {
    console.error(
      'Add NFT_CONTRACT_ADDRESS or FACTORY_CONTRACT_ADDRESS to the environment variables'
    );
  }
}
main();
