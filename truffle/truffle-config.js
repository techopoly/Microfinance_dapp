module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Ganache's default local IP address
      port: 7545, // Ganache's default port
      network_id: "*", // Match any network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.4", // Specify the Solidity version you want to use
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
  contracts_build_directory: '../public/contract/',
};
