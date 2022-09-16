import { ethers } from "ethers"
import { useEffect, useState, useContext } from "react"
import erc721abi from "../../../constants/ERC721.json"
import { UserContext } from "../../../App"

function NftCard({ nftAddress, tokenId, seller, price, updatePrice, cancelListing, buyItem }) {
  const [tokenURI, setTokenURI] = useState("")
  const [metadata, setMetadata] = useState()
  const { address, signer } = useContext(UserContext)

  const nftContract = new ethers.Contract(nftAddress, erc721abi, signer)

  useEffect(() => {
    getTokenURI().then((res) => setTokenURI(res))
  }, [])

  useEffect(() => {
    decodeTokenURI(tokenURI)
  }, [tokenURI])

  async function getTokenURI() {
    return await nftContract.tokenURI(Number(tokenId))
  }

  async function decodeTokenURI(uri) {
    const httpUri = uri.replace("ipfs://", "https://ipfs.io/ipfs/")
    setMetadata(
      await fetch(httpUri)
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => console.error(err))
    )
  }

  return (
    <div className="border-2 rounded md:w-1/4 m-3">
      <div className="border-2 rounded flex flex-col">
        nft address:{" "}
        {nftAddress.slice(0, 6).toLowerCase() + "..." + nftAddress.slice(-6).toLowerCase()} <br />
        tokenId: {tokenId} <br />
        price: {price / 10 ** 18} ETH <br />
        {!metadata ? (
          <>
            tokenURI: {tokenURI} <br />
          </>
        ) : (
          <>
            name: {metadata.name} <br />
            description: {metadata.description} <br />
            <img
              className="rounded order-first"
              src={metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
              alt="nft image"
            />
          </>
        )}
      </div>
      <div>
        {seller.toLowerCase() === address.toLowerCase() ? (
          <>
            <button
              className="rounded bg-blue-200 p-1 px-4 m-2"
              onClick={() => {
                const newPrice = prompt("Enter the new price below: ")
                updatePrice(nftAddress, tokenId, newPrice)
              }}
            >
              Update Price
            </button>
            <button
              className="rounded bg-blue-200 p-1 px-4 m-2"
              onClick={() => {
                cancelListing(nftAddress, tokenId)
              }}
            >
              Delete Listing
            </button>
          </>
        ) : (
          <>
            <button
              className="rounded bg-blue-200 p-1 px-4 m-2"
              onClick={() => {
                buyItem(nftAddress, tokenId, price)
              }}
            >
              Buy
            </button>
          </>
        )}
      </div>
    </div>
  )
}
export default NftCard
