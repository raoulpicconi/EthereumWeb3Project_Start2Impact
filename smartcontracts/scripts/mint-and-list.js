const { ethers, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

async function main() {
  const { deployer } = await getNamedAccounts()
  if (developmentChains.includes(network.name)) {
    await deployments.fixture(["all"])
  }
  const nftMarketplace = await ethers.getContract("NftMarketplace")
  const myERC721Factory = await ethers.getContractFactory("myERC721")
  const myERC721 = await myERC721Factory.deploy("NonFungibleToken", "NFT", 10)
  await myERC721.deployed()

  let tx = await myERC721.mint("Token URI")
  await tx.wait()
  tx = await myERC721.approve(nftMarketplace.address, 0)
  await tx.wait()
  await nftMarketplace.listItem(myERC721.address, 0, ethers.utils.parseEther("2"))
  console.log("Item minted and listed for 2 ethers")
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
