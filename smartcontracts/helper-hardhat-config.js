const networkConfig = {
  31337: {
    name: "localhost",
  },
  4: {
    name: "rinkeby",
  },
  5: {
    name: "goerli",
  },
}

const developmentChains = ["hardhat", "localhost"]
const frontendContractDataPath = "../frontend/src/constants/networkMapping.json"
const frontendContractAbiPath = "../frontend/src/constants/"
const theGraphContractDataPath = "../nftMarketplaceSubgraph/networks.json"
module.exports = {
  networkConfig,
  developmentChains,
  frontendContractDataPath,
  theGraphContractDataPath,
  frontendContractAbiPath,
}
