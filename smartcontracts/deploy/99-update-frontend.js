const {
  frontendContractAbiPath,
  frontendContractDataPath,
  theGraphContractDataPath,
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config")
require("dotenv").config()
const fs = require("fs")
const { network, ethers } = require("hardhat")

const frontendNeededContracts = ["ERC721Factory", "NftMarketplace"]

async function updateAbi(abiPath, contractName) {
  const contract = await ethers.getContract(contractName)
  fs.writeFileSync(
    `${abiPath}${contractName}.json`,
    contract.interface.format(ethers.utils.FormatTypes.json)
  )
}

async function updateContractAddresses(contractDataPath, contractName) {
  const chainId = network.config.chainId.toString()
  const contract = await ethers.getContract(contractName)
  const contractAddresses = JSON.parse(fs.readFileSync(contractDataPath, "utf8"))

  if (chainId in contractAddresses) {
    if (contractAddresses[chainId][contractName]) {
      if (!contractAddresses[chainId][contractName].includes(contract.address)) {
        contractAddresses[chainId][contractName].push(contract.address)
      }
    } else {
      contractAddresses[chainId][contractName] = [contract.address]
    }
  } else {
    contractAddresses[chainId] = { [contractName]: [contract.address] }
  }
  fs.writeFileSync(contractDataPath, JSON.stringify(contractAddresses))
}

async function updateSubgraph(contractDataPath, contractName) {
  const chainId = network.config.chainId.toString()
  const chainName = networkConfig[chainId].name
  const contract = await ethers.getContract(contractName)
  const contractAddresses = JSON.parse(fs.readFileSync(contractDataPath, "utf8"))

  if (chainName in contractAddresses) {
    if (contractAddresses[chainName][contractName]) {
      if (
        contractAddresses[chainName][contractName][address] &&
        !contractAddresses[chainName][contractName][address].includes(contract.address)
      )
        contractAddresses[chainName][contractName].address = contract.address
    } else {
      contractAddresses[chainName][contractName] = { address: contract.address }
    }
  } else {
    contractAddresses[chainName] = { [contractName]: { address: contract.address } }
  }
  fs.writeFileSync(contractDataPath, JSON.stringify(contractAddresses))
}

async function updateContractData(contractName) {
  if (!developmentChains.includes(network.name)) {
    await updateAbi(frontendContractAbiPath, contractName)
    await updateContractAddresses(frontendContractDataPath, contractName)
    await updateSubgraph(theGraphContractDataPath, contractName)
  }
}

module.exports = async () => {
  if (process.env.UPDATE_FRONTEND) {
    console.log("Updating frontend constants...")
    for (contract of frontendNeededContracts) {
      await updateContractData(contract)
    }
    console.log("Frontend updated!")
  }
}
