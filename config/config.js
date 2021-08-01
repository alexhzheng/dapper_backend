/** @format */

const config = {
  port: process.env.PORT || 3000,
  expireTime: "7d",
};

const dbUser = process.env.db_username;
const dbPassword = process.env.db_username;

// Setting environment variable
// process.env.NODE_ENV = 'process.env.NODE_ENV' || 'development';
process.env.NODE_ENV = "development";

function getEnvironmentConfig() {
  switch (process.env.NODE_ENV) {
    case "test":
      return {
        dbConnection: "mongodb://localhost:27017/niftypantone",
        whitelistDomains: ["http://localhost:3001", "http://localhost:3002"],
        port: config.port,
      };
    case "development":
      return {
        // dbConnection: 'mongodb://localhost:27017/niftypantone',
        dbConnection: `mongodb+srv://alexhz:dapper69@dapps.1nzb4.mongodb.net/dappers?retryWrites=true&w=majority`,

        whitelistDomains: [
          "http://localhost:3001",
          "http://localhost:3002",
          "http://localhost:3000",
        ],
        port: config.port,
      };
    // case 'staging':
    //   return {
    //     dbConnection: `mongodb+srv://${dbUser}:${dbPassword}@pantone-staging.doykp.mongodb.net/niftypantone?authSource=admin&ssl=true&retryWrites=true&w=majority`,
    //     whitelistDomains: [
    //       'http://localhost:3001',
    //       'http://localhost:3002',
    //       'http://localhost:3000',
    //     ],
    //     port: config.port,
    //   };
    // case 'production':
    //   return {
    //     dbConnection: `mongodb+srv://${dbUser}:${dbPassword}@colordb.lsnn1.mongodb.net/niftypantone?authSource=admin&ssl=true&retryWrites=true&w=majority`,
    //     whitelistDomains: ['api.niftypalette.io', 'http://localhost:3002'],
    //     port: config.port,
    //   };
    default:
      return {
        error: "No environment provided",
      };
  }
}

module.exports = getEnvironmentConfig();
