const HDWalletProvider = require ('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      // provider: () => {
      //   return new HDWalletProvider(process.env.MNEMONIC, "http://localhost:8545");
      // },
      network_id: "*" // Match any network id
    },
    rinkeby: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () => {
        return new HDWalletProvider(process.env.MNEMONIC, process.env.RINKEBY);
      },
      network_id: '4',
    }
  }
}