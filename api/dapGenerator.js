/** @format */

const mongoose = require('mongoose');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const ReadableData = require('stream').Readable;

const pinataApiKey = 'ae903a9f22580f9e4e89';
const pinataSecretApiKey =
  'b69380f00b200046dd10caad8516f7c82cc1fb1c061d457d47f8cbcf2c8d02e9';

const pinFileToIPFS = async (imgUrl) => {
  let data = new FormData();
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  axios
    .post(url, data, {
      maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    })
    .then(function (response) {
      //handle response here
      console.log(response.data.IpfsHash);
    })
    .catch(function (error) {
      //handle error here
    });
};
