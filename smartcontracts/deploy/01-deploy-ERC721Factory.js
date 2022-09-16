const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const ERC721Factory = await deploy("ERC721Factory", {
    from: deployer,
    args: [],
    log: true,
  })
  log("------------------------------------------------")

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(ERC721Factory.address)
    log("------------------------------------------------")
  }
}

module.exports.tags = ["all", "ERC721Factory"]
