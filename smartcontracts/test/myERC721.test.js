const { assert, expect } = require("chai")
const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
!developmentChains.includes(network.name)
  ? describe.skip
  : describe("myERC721", () => {
      let deployer, player, myERC721, accounts
      const MY_ERC721_NAME = "NonFungibleTokens"
      const MY_ERC721_SYMBOL = "NFTs"
      const MY_ERC721_MAX_SUPPLY = 20
      const TOKEN_URI = "Token URI"
      const TOKEN_ID = 0
      beforeEach(async () => {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        player = accounts[1]
        const myERC721Factory = await ethers.getContractFactory("myERC721", deployer)
        myERC721 = await myERC721Factory.deploy(
          MY_ERC721_NAME,
          MY_ERC721_SYMBOL,
          MY_ERC721_MAX_SUPPLY,
          deployer.address
        )
        await myERC721.deployed()
      })

      describe("Constructor", () => {
        it("Should set the name properly", async () => {
          const contractName = await myERC721.name()
          assert.equal(contractName, MY_ERC721_NAME)
        })
        it("Should set the symbol properly", async () => {
          const contractSymbol = await myERC721.symbol()
          assert.equal(contractSymbol, MY_ERC721_SYMBOL)
        })
        it("Should set the total supply to 0", async () => {
          const totalSupply = await myERC721.totalSupply()
          assert.equal(totalSupply.toString(), "0")
        })
      })

      describe("Mint", () => {
        beforeEach(async () => {
          myERC721.mint(TOKEN_URI)
        })
        it("Should update the totalSupply", async () => {
          const totalSupply = await myERC721.totalSupply()
          assert.equal(totalSupply.toString(), "1")
        })
        it("Should send the NFT to player", async () => {
          const nftOwner = await myERC721.ownerOf(TOKEN_ID)
          assert.equal(nftOwner, deployer.address)
        })
        it("Should update the balance of player", async () => {
          const balanceOfDeployer = await myERC721.balanceOf(deployer.address)
          assert.equal(balanceOfDeployer.toString(), "1")
        })
        it("Should set the token uri properly", async () => {
          const tokenURI = await myERC721.tokenURI(TOKEN_ID)
          assert.equal(tokenURI, TOKEN_URI)
        })
      })
      describe("TransferFrom", () => {
        beforeEach(async () => {
          await myERC721.mint(TOKEN_URI)
        })
        it("Should transfer nft from deployer to player", async () => {
          myERC721.transferFrom(deployer.address, player.address, TOKEN_ID)
          const nftOwner = await myERC721.ownerOf(TOKEN_ID)
          assert.equal(nftOwner, player.address)
        })
      })
      describe("Approve", () => {
        beforeEach(async () => {
          await myERC721.mint(TOKEN_URI)
        })
        it("Should approve player to transfer nft with token id 0", async () => {
          await myERC721.approve(player.address, TOKEN_ID)
          const approvedAddress = await myERC721.getApproved(TOKEN_ID)
          assert.equal(approvedAddress, player.address)
        })
        it("Player should transfer the deployer's nft after get approved", async () => {
          const receiver = accounts[2]
          await myERC721.approve(player.address, TOKEN_ID)
          const playerConnectedERC721 = await myERC721.connect(player)
          await playerConnectedERC721.transferFrom(deployer.address, receiver.address, TOKEN_ID)
          const nftOwner = await myERC721.ownerOf(TOKEN_ID)
          assert.equal(nftOwner, receiver.address)
        })
      })
      describe("SetApprovalForAll", () => {
        beforeEach(async () => {
          await myERC721.mint(TOKEN_URI)
        })
        it("Should approve player for all", async () => {
          await myERC721.setApprovalForAll(player.address, true)
          const isApprovedForAll = await myERC721.isApprovedForAll(deployer.address, player.address)
          assert.equal(isApprovedForAll, true)
        })
      })
    })
