import NftAddressSuggestions from "../../Common/NftAddressSuggestions"
import { useState, useContext } from "react"
import { UserContext } from "../../../App"
import { ethers } from "ethers"
import myERC721 from "../../../constants/myERC721.json"

function ListNftForm({ listItem, marketplaceAddress }) {
  const [nftAddress, setNftAddress] = useState("")
  const [tokenId, setTokenId] = useState(0)
  const [price, setPrice] = useState(0)

  const { signer } = useContext(UserContext)

  async function approve() {
    const erc721 = new ethers.Contract(nftAddress, myERC721.abi, signer)
    const tx = await erc721.approve(marketplaceAddress, tokenId)
    return await tx.wait()
  }
  return (
    <form
      className="flex flex-col items-center w-full"
      onSubmit={async (e) => {
        e.preventDefault()
        await approve()
        listItem(nftAddress, tokenId, ethers.utils.parseEther(price.toString()))
      }}
    >
      <label htmlFor="nftAddress">NFT Address</label>
      <input
        className="text-center border-2 rounded w-2/3"
        name="nftAddress"
        type="text"
        list="nftAddresses"
        onChange={(e) => {
          setNftAddress(e.target.value)
        }}
      />
      <NftAddressSuggestions />
      <label htmlFor="tokenId">Token ID</label>
      <input
        className="text-center border-2 rounded w-2/3"
        name="tokenId"
        onChange={(e) => {
          setTokenId(e.target.value)
        }}
      />
      <label htmlFor="price">Price in ETH</label>
      <input
        className="text-center border-2 rounded w-2/3"
        name="price"
        onChange={(e) => {
          setPrice(e.target.value)
        }}
      />
      <button className="rounded bg-blue-200 p-2 px-5 m-2" type="submit">
        List
      </button>
    </form>
  )
}

export default ListNftForm
