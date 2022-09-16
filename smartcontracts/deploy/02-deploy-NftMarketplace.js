const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const nftMarketplace = await deploy("NftMarketplace", {
    from: deployer,
    args: [],
    log: true,
  })
  log("------------------------------------------------")

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(nftMarketplace.address)
    log("------------------------------------------------")
  }
}

module.exports.tags = ["all", "nftMarketplace"]
