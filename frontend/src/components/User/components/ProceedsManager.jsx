import { ethers } from "ethers"
import nftMarketplaceAbi from "../../../constants/NftMarketplace.json"
import networkMapping from "../../../constants/networkMapping.json"
import { UserContext } from "../../../App"
import { useContext, useState, useEffect } from "react"

function ProceedsManager() {
  const [balance, setBalance] = useState(0)
  const [balanceClass, setBalanceClass] = useState("filter blur-sm")
  const [showProceeds, setShowProceeds] = useState(false)

  const { address, signer } = useContext(UserContext)

  const chainId = Number(window.ethereum.chainId)
  const nftMarketplaceAddress = networkMapping[chainId].NftMarketplace.at(-1)
  const nftMarketplace = new ethers.Contract(nftMarketplaceAddress, nftMarketplaceAbi, signer)

  function changeVisibility() {
    if (showProceeds) {
      setShowProceeds(false)
      setBalanceClass("filter blur-sm")
    } else {
      setShowProceeds(true)
      setBalanceClass("")
    }
  }

  useEffect(() => {
    getProceeds()
      .then((res) => setBalance(Number(res)))
      .catch((err) => console.error(err))
  }, [])

  async function getProceeds() {
    return await nftMarketplace.getProceeds(address)
  }

  async function withdrawProceeds() {
    await nftMarketplace.withdrawProceeds()
  }

  return (
    <div className="flex flex-col items-center md:w-1/3 border-2 ">
      <h3 className="text-xl">Proceeds</h3>
      <p className={balanceClass}>{balance} ETH</p>
      <div className="flex justify-between md:w-2/3 mt-2 mb-2">
        <button
          className="rounded bg-blue-200 p-1 mx-2"
          onClick={() => {
            withdrawProceeds()
          }}
        >
          Withdraw
        </button>
        <button
          className="rounded bg-blue-200 p-1 mx-2"
          onClick={() => {
            changeVisibility()
            getProceeds()
              .then((res) => setBalance(Number(res)))
              .catch((err) => console.error(err))
          }}
        >
          {showProceeds ? "Hide proceeds" : "Show proceeds"}
        </button>
      </div>
    </div>
  )
}

export default ProceedsManager
