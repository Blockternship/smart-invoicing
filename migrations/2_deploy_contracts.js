// Override Promise with bluebird
const Promise = require('bluebird');
const assert = require('assert');

const path = '../node_modules/requestNetwork/contracts/';
const RequestCore = artifacts.require(path + 'core/RequestCore.sol');
const RequestEthereum = artifacts.require(path + 'synchrone/RequestEthereum.sol');
// const RequestERC20 = artifacts.require(path + 'synchrone/RequestERC20.sol');

const addressContractBurner = "0xfCb4393e7fAef06fAb01c00d67c1895545AfF3b8";
const feesPerTenThousand = 10; // 0.1 %
const maxFees = web3.toWei(0.002, 'ether');

var InvoicingApp = artifacts.require('InvoicingApp')

module.exports = async function(deployer) {
  return deployer.deploy(RequestCore)
  .then(() => {
    return deployer.deploy(RequestEthereum, RequestCore.address, addressContractBurner);
  })
  .then(async () => {
    const instances = await createInstances();
    await setupContracts(instances);
    await checks(instances);
    console.log('Request network contracts deployed, checks complete');
    return deployer.deploy(InvoicingApp);
  })
  .then(async () => {
    const InvoicingAppInstance = await InvoicingApp.deployed();
    return InvoicingAppInstance.setRequestEthereumAddress(RequestEthereum.address, RequestCore.address)
  })
};

function createInstances() {
  return Promise.props({
    core: RequestCore.deployed(),
    ethereum: RequestEthereum.deployed()
  });
}

function setupContracts({ ethereum: ethereumInstance, core: coreInstance }) {
  return Promise.all([
    coreInstance.adminAddTrustedCurrencyContract(ethereumInstance.address),
    ethereumInstance.setFeesPerTenThousand(feesPerTenThousand),
    ethereumInstance.setMaxCollectable(maxFees),
  ]);
}

// Execute some assertions to ensure the contract are correctly deployed and set up
function checks({ ethereum: ethereumInstance, core: coreInstance }) {
  return Promise.all([
    coreInstance.getStatusContract(ethereumInstance.address).then(status => {
      assert(status.toNumber() === 1, 'Ethereum contract should be trusted in Core')
    }),

    ethereumInstance.feesPer10000.call().then(feesPer10000fromContract => {
      assert(feesPer10000fromContract.toNumber() === feesPerTenThousand, `Ethereum contract fees should be ${feesPerTenThousand}`)
    }),

    ethereumInstance.maxFees.call().then(maxFeesFromContract => {
      assert(maxFeesFromContract.toString() === maxFees, `Ethereum contract maxfees should be ${maxFees}`)
    })
  ]);
}
