const { ethers, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

async function main() {
  const { deployer } = await getNamedAccounts()
  if (developmentChains.includes(network.name)) {
    await deployments.fixture(["ERC721Factory"])
  }
  const ERC721Factory = await ethers.getContract("ERC721Factory", deployer)

  console.log(`Got ERC721Factory contract at: ${ERC721Factory.address}`)

  const tx = await ERC721Factory.createNewNftContract("NonFungibleToken", "NFT", 10)
  await tx.wait()
  console.log("Transaction sended!")
  console.log(tx)
  logs = (await ERC721Factory.queryFilter("NftContractCreated", -1, "latest"))[0]["args"]
  console.log(
    `New NFt contract created at: ${logs.contractAddress}, with name: "${logs.name}", symbol "${logs.symbol} and max supply: ${logs.maxSupply}.`
  )
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
