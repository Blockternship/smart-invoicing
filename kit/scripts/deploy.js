const deployDAOFactory = require('@aragon/os/scripts/deploy-daofactory.js')
const Kit = artifacts.require('Kit')

const ensAddr = "0x5f6f7e8cc7346a11ca2def8f827b7a0b612c56a1" //process.env.ENS

module.exports = async (callback) => {
  if (!ensAddr) {
    callback(new Error("ENS address not found in environment variable ENS"))
  }

  // const { daoFactory } = await deployDAOFactory(null, { artifacts, verbose: false })

  // const kit = await Kit.new(daoFactory.address, ensAddr)
  const kit = await Kit.new(ensAddr)
  console.log(kit.address)

  callback()
}