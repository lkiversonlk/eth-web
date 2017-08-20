module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    live : {
      host: "localhost",
      network_id: 1,
      port: 8546
    }
  }
};
