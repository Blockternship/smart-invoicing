const deployDAOFactory = require('@aragon/os/scripts/deploy-daofactory.js')
const Kit = artifacts.require('Kit')


const ensAddr = process.env.ENS || "0x5f6f7e8cc7346a11ca2def8f827b7a0b612c56a1"
// const ensAddr = "0x5f6f7e8cc7346a11ca2def8f827b7a0b612c56a1"

module.exports = async (callback) => {
  // console.log(web3.version.getNetwork((err, result) => {
  //   console.log(result)
  // }))
  // console.log(await web3.eth.net.getId())
  console.log('ENS', ensAddr)
  if (!ensAddr) {
    callback(new Error("ENS address not found in environment variable ENS"))
  }

  const { daoFactory } = await deployDAOFactory(null, { artifacts, verbose: false })

  const kit = await Kit.new(daoFactory.address, ensAddr)
  // const kit = await Kit.new(ensAddr)
  console.log(kit.address)

  callback()
}