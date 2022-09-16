import { ethers } from "ethers"
import { UserContext } from "../../App"
import { useContext } from "react"
import ListNftForm from "./components/ListNftForm"
import ProceedsManager from "./components/ProceedsManager"
import networkMapping from "../../constants/networkMapping.json"
import marketplaceAbi from "../../constants/NftMarketplace.json"

function Userpage() {
  const { signer } = useContext(UserContext)
  const chainId = parseInt(window.ethereum.chainId).toString()
  const marketplaceAddress = networkMapping[chainId].NftMarketplace[0]
  const marketplaceContract = new ethers.Contract(marketplaceAddress, marketplaceAbi, signer)

  async function listItem(nftAddress, tokenId, price) {
    await marketplaceContract.listItem(nftAddress, tokenId, price)
  }

  return (
    <div className="flex flex-col items-center md:flex-row md:justify-around mt-8">
      <div className="flex flex-col items-center w-1/2 border-2 rounded mb-5">
        <h3 className="text-xl mb-4">List NFT</h3>
        <ListNftForm listItem={listItem} marketplaceAddress={marketplaceAddress} />
      </div>
      <ProceedsManager />
    </div>
  )
}
export default Userpage
