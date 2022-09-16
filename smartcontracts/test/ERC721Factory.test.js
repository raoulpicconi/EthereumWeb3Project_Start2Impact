const { assert, expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
!developmentChains.includes(network.name)
  ? describe.skip
  : describe("ERC721Factory", () => {
      let deployer, ERC721Factory
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        ERC721Factory = await ethers.getContract("ERC721Factory", deployer)
      })
      describe("createNewNftContract", () => {
        let transactionReceipt
        beforeEach(async () => {
          const transactionResponse = await ERC721Factory.createNewNftContract(
            "NonFungibleToken",
            "NFT",
            10
          )
          transactionReceipt = await transactionResponse.wait()
        })
        it("Should set the name to NonFungibleToken", async () => {
          const name = transactionReceipt.events[transactionReceipt.events.length - 1].args[0]
          assert.equal(name, "NonFungibleToken")
        })
        it("Should set the symbol to NFT", async () => {
          const symbol = transactionReceipt.events[transactionReceipt.events.length - 1].args[1]
          assert.equal(symbol, "NFT")
        })
        it("Should set the max supply to 10", async () => {
          const maxSupply = transactionReceipt.events[transactionReceipt.events.length - 1].args[2]
          assert.equal(parseInt(maxSupply.toString()), 10)
        })
        it("Should create the contractAddress", async () => {
          const contractAddress =
            transactionReceipt.events[transactionReceipt.events.length - 1].args[3]
          expect(contractAddress).to.include("0x")
        })
        it("Should set the sender to deployer", async () => {
          const sender = transactionReceipt.events[transactionReceipt.events.length - 1].args[4]
          assert.equal(sender, deployer)
        })
      })
    })
