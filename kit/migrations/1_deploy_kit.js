const Kit = artifacts.require('Kit')
// const ensAddr = process.env.ENS || "0x5f6f7e8cc7346a11ca2def8f827b7a0b612c56a1"
const ensAddr = "0x5f6f7e8cc7346a11ca2def8f827b7a0b612c56a1"

module.exports = async function(deployer) {
  deployer.deploy(Kit, ensAddr)
}