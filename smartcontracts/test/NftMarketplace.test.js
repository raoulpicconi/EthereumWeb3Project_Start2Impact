const { assert, expect } = require("chai")
const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
!developmentChains.includes(network.name)
  ? describe.skip
  : describe("nftMarketplace", () => {
      let deployer, player, player2, NftMarketplace, myERC721, myERC721Factory
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        NftMarketplace = await ethers.getContract("NftMarketplace", deployer)
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        player = accounts[1]
        player2 = accounts[2]
        myERC721Factory = await ethers.getContractFactory("myERC721", deployer)
      })
      describe("listItem", () => {
        beforeEach(async () => {
          myERC721 = await myERC721Factory.deploy("name", "symbol", 10, deployer.address)
          await myERC721.deployed()
          await myERC721.mint("Token URI")
        })
        it("Should revert if the caller is not the owner of the nft", async () => {
          const nftMarketplacePlayerConnected = NftMarketplace.connect(player)
          expect(
            nftMarketplacePlayerConnected.listItem(
              myERC721.address,
              0,
              ethers.utils.parseEther("1")
            )
          ).to.be.revertedWith("NotOwner()")
        })
        it("Should revert if the item is already listed", async () => {
          await myERC721.approve(NftMarketplace.address, 0)
          await NftMarketplace.listItem(myERC721.address, 0, ethers.utils.parseEther("1"))
          expect(
            NftMarketplace.listItem(myERC721.address, 0, ethers.utils.parseEther("1"))
          ).to.be.revertedWith("AlreadyListed")
        })
        it("Should revert if the price is smaller than 0", async () => {
          expect(
            NftMarketplace.listItem(myERC721.address, 0, ethers.utils.parseEther("0"))
          ).to.be.revertedWith("PriceMustBeAboveZero")
        })
        it("Should revert if the item is not approved for the marketplace contract", async () => {
          expect(
            NftMarketplace.listItem(myERC721.address, 0, ethers.utils.parseEther("1"))
          ).to.be.revertedWith("NotApprovedForMarketplace")
        })
        it("Should update the listings mapping", async () => {
          await myERC721.approve(NftMarketplace.address, 0)
          await NftMarketplace.listItem(myERC721.address, 0, ethers.utils.parseEther("1"))
          const listing = await NftMarketplace.getListing(myERC721.address, 0)
          assert.equal(listing.price.toString(), ethers.utils.parseEther("1").toString())
          assert.equal(listing.seller, deployer.address)
        })
        it("Should emit an event", async () => {
          await myERC721.approve(NftMarketplace.address, 0)
          expect(
            NftMarketplace.listItem(myERC721.address, 0, ethers.utils.parseEther("1"))
          ).to.emit(NftMarketplace, "ItemListed")
        })
      })
      describe("cancelListing", () => {
        beforeEach(async () => {
          myERC721 = await myERC721Factory.deploy("name", "symbol", 10, deployer.address)
          await myERC721.deployed()
          await myERC721.mint("Token URI")
          await myERC721.approve(NftMarketplace.address, 0)
        })
        it("Should revert if the caller is not the owner of the nft", async () => {
          const nftMarketplacePlayerConnected = NftMarketplace.connect(player)
          expect(
            nftMarketplacePlayerConnected.cancelListing(myERC721.address, 0)
          ).to.be.revertedWith("NotOwner()")
        })
        it("Should revert if the item is not listed", async () => {
          expect(NftMarketplace.cancelListing(myERC721.address, 0)).to.be.revertedWith("NotListed")
        })
        it("Should update the listings mapping", async () => {
          await NftMarketplace.listItem(myERC721.address, 0, ethers.utils.parseEther("1"))
          await NftMarketplace.cancelListing(myERC721.address, 0)
          expect(NftMarketplace.getListing(myERC721.address, 0)).to.be.reverted
        })
        it("Should emit an event", async () => {
          await NftMarketplace.listItem(myERC721.address, 0, ethers.utils.parseEther("1"))
          expect(NftMarketplace.cancelListing(myERC721.address, 0)).to.emit(
            NftMarketplace,
            "ItemCanceled"
          )
        })
      })
      describe("buyItem", () => {
        beforeEach(async () => {
          myERC721 = await myERC721Factory.deploy("name", "symbol", 10, deployer.address)
          await myERC721.deployed()
          await myERC721.mint("Token URI")
          await myERC721.approve(NftMarketplace.address, 0)
        })
        it("Should revert if the item is not listed", async () => {
          expect(NftMarketplace.buyItem(myERC721.address, 0)).to.be.revertedWith("NotListed")
        })
        it("Should revert if the msg.value is smaller than the price", async () => {
          await NftMarketplace.listItem(myERC721.address, 0, ethers.utils.parseEther("1"))
          expect(NftMarketplace.buyItem(myERC721.address, 0)).to.be.revertedWith("PriceNotMet")
        })
        it("Should update the listings mapping", async () => {
          await NftMarketplace.listItem(myERC721.address, 0, ethers.utils.parseEther("1"))
          const nftMarketplacePlayerConnected = NftMarketplace.connect(player)
          await nftMarketplacePlayerConnected.buyItem(myERC721.address, 0, {
            value: ethers.utils.parseEther("1"),
          })
          expect(NftMarketplace.getListing()).to.be.reverted
        })
        it("Should transfer the item to the buyer", async () => {
          await NftMarketplace.listItem(myERC721.address, 0, ethers.utils.parseEther("1"))
          const nftMarketplacePlayerConnected = NftMarketplace.connect(player)
          nftMarketplacePlayerConnected.buyItem(myERC721.address, 0, {
            value: ethers.utils.parseEther("1"),
          })
          const newOwner = await myERC721.ownerOf(0)
          assert.equal(newOwner, player.address)
        })
        it("Should emit an event", async () => {
          await NftMarketplace.listItem(myERC721.address, 0, ethers.utils.parseEther("1"))
          const nftMarketplacePlayerConnected = NftMarketplace.connect(player)
          expect(
            nftMarketplacePlayerConnected.buyItem(myERC721.address, 0, {
              value: ethers.utils.parseEther("1"),
            })
          ).to.emit(NftMarketplace, "ItemBought")
        })
      })
      describe("updateListing", () => {
        beforeEach(async () => {
          myERC721 = await myERC721Factory.deploy("name", "symbol", 10, deployer.address)
          await myERC721.deployed()
          await myERC721.mint("Token URI")
          await myERC721.approve(NftMarketplace.address, 0)
        })
        it("Should revert if the caller is not the owner of the nft", async () => {
          await NftMarketplace.listItem(myERC721.address, 0, ethers.utils.parseEther("1"))
          const nftMarketplacePlayerConnected = NftMarketplace.connect(player)
          expect(
            nftMarketplacePlayerConnected.updateListing(
              myERC721.address,
              0,
              ethers.utils.parseEther("1")
            )
          ).to.be.revertedWith("NotOwner")
        })
        it("Should revert if the item is not listed", async () => {
          expect(
            NftMarketplace.updateListing(myERC721.address, 0, ethers.utils.parseEther("1"))
          ).to.be.revertedWith("NotListed")
        })
        it("Should revert if the new price is smaller than 0", async () => {
          await NftMarketplace.listItem(myERC721.address, 0, ethers.utils.parseEther("1"))
          expect(
            NftMarketplace.updateListing(myERC721.address, 0, ethers.utils.parseEther("0"))
          ).to.be.revertedWith("PriceMustBeAboveZero")
        })
        it("Should update the listings mapping", async () => {
          await NftMarketplace.listItem(myERC721.address, 0, ethers.utils.parseEther("1"))
          await NftMarketplace.updateListing(myERC721.address, 0, ethers.utils.parseEther("2"))
          const listing = await NftMarketplace.getListing(myERC721.address, 0)
          assert.equal(listing.price.toString(), ethers.utils.parseEther("2").toString())
          assert.equal(listing.seller, deployer.address)
        })
        it("Should emit an event", async () => {
          await NftMarketplace.listItem(myERC721.address, 0, ethers.utils.parseEther("1"))
          expect(
            NftMarketplace.updateListing(myERC721.address, 0, ethers.utils.parseEther("2"))
          ).to.emit(NftMarketplace, "ItemListed")
        })
      })
      describe("withdrawProceeds", () => {
        beforeEach(async () => {
          myERC721 = await myERC721Factory.deploy("name", "symbol", 10, deployer.address)
          await myERC721.deployed()
          await myERC721.mint("Token URI")
          await myERC721.approve(NftMarketplace.address, 0)
          await NftMarketplace.listItem(myERC721.address, 0, ethers.utils.parseEther("1"))
        })
        it("Should revert if the owner has not proceed", async () => {
          expect(NftMarketplace.withdrawProceeds()).to.be.revertedWith("NoProceeds")
        })
        it("Should reset the proceeds to 0", async () => {
          const nftMarketplacePlayerConnected = NftMarketplace.connect(player)
          await nftMarketplacePlayerConnected.buyItem(myERC721.address, 0, {
            value: ethers.utils.parseEther("1"),
          })
          let proceeds = await NftMarketplace.getProceeds(deployer.address)
          expect(Number(proceeds)).to.be.greaterThan(Number(ethers.utils.parseEther("0.9")))
          await NftMarketplace.withdrawProceeds()
          proceeds = await NftMarketplace.getProceeds(deployer.address)
          assert.equal(proceeds, 0)
        })
        it("Should transfer all his proceeds to the caller", async () => {
          const firstBalance = Number(await deployer.getBalance())
          const nftMarketplacePlayerConnected = NftMarketplace.connect(player)
          await nftMarketplacePlayerConnected.buyItem(myERC721.address, 0, {
            value: ethers.utils.parseEther("1"),
          })
          await NftMarketplace.withdrawProceeds()
          const newBalance = Number(await deployer.getBalance())
          expect(newBalance).to.be.greaterThan(firstBalance)
        })
      })
      describe("withdrawOwnerProceeds", () => {
        it("Should revert if the caller is not the owner of the contract", async () => {
          const nftMarketplacePlayerConnected = NftMarketplace.connect(player)
          expect(nftMarketplacePlayerConnected.withdrawOwnerProceeds()).to.be.revertedWith("")
        })
        it("Should transfer all the owner proceeds to owner", async () => {
          const firstBalance = Number(await deployer.getBalance())

          const myERC721 = await myERC721Factory
            .connect(player)
            .deploy("name", "symbol", 10, player.address)
          await myERC721.deployed()
          await myERC721.mint("Token URI")
          await myERC721.approve(NftMarketplace.address, 0)
          await NftMarketplace.connect(player).listItem(
            myERC721.address,
            0,
            ethers.utils.parseEther("1")
          )

          await NftMarketplace.connect(player2).buyItem(myERC721.address, 0, {
            value: ethers.utils.parseEther("1"),
          })

          await NftMarketplace.withdrawOwnerProceeds()
          const newBalance = Number(await deployer.getBalance())
          expect(newBalance).to.be.greaterThan(firstBalance)
        })
      })
    })
