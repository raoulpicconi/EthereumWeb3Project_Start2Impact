import { useQuery, gql } from "@apollo/client"
import { ethers } from "ethers"
import networkMapping from "../../constants/networkMapping.json"
import marketplaceAbi from "../../constants/NftMarketplace.json"
import NftsList from "./components/NftsList"
import { UserContext } from "../../App"
import { useContext } from "react"

const ACTIVE_ITEMS_QUERY = gql`
  {
    activeItems(first: 5, where: { buyer: "0x0000000000000000000000000000000000000000" }) {
      id
      buyer
      seller
      nftAddress
      tokenId
      price
    }
  }
`

function Marketplace() {
  const { loading, error, data: listedNfts } = useQuery(ACTIVE_ITEMS_QUERY)
  const { signer } = useContext(UserContext)
  const chainId = Number(window.ethereum.chainId)
  const marketplaceAddress = networkMapping[chainId].NftMarketplace[0]
  const marketplaceContract = new ethers.Contract(marketplaceAddress, marketplaceAbi, signer)

  async function buyItem(nftAddress, tokenId, price) {
    await marketplaceContract.buyItem(nftAddress, tokenId, { value: price })
  }

  async function cancelListing(nftAddress, tokenId) {
    await marketplaceContract.cancelListing(nftAddress, tokenId)
  }

  async function updatePrice(nftAddress, tokenId, newPrice) {
    await marketplaceContract.updateListing(nftAddress, tokenId, newPrice)
  }

  if (error) return `Error: ${error}`
  if (loading) return "Loading..."

  return (
    <>
      <div>Marketplace</div>
      {listedNfts && listedNfts.activeItems.length === 0 ? (
        <div>Nothing for sale! Try later.</div>
      ) : (
        <NftsList
          listedNfts={listedNfts}
          buyItem={buyItem}
          cancelListing={cancelListing}
          updatePrice={updatePrice}
        />
      )}
    </>
  )
}
export default Marketplace
