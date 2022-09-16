import { useState, useContext } from "react"
import networkMapping from "../../../constants/networkMapping.json"
import ERC721FactoryAbi from "../../../constants/ERC721Factory.json"
import { ethers } from "ethers"
import { UserContext } from "../../../App"

function NewCollectionForm() {
  const [collectionName, setCollectionName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [maxSupply, setMaxSupply] = useState(0)

  const { signer } = useContext(UserContext)

  const chainId = parseInt(window.ethereum.chainId).toString()
  const ERC721FactoryAddress = networkMapping[chainId].ERC721Factory.at(-1)
  const ERC721FactoryContract = new ethers.Contract(ERC721FactoryAddress, ERC721FactoryAbi, signer)

  async function createNewNftContract() {
    await ERC721FactoryContract.createNewNftContract(collectionName, symbol, maxSupply)
  }

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={(e) => {
        e.preventDefault()
        createNewNftContract()
        setCollectionName("")
        setMaxSupply(null)
        setSymbol("")
      }}
    >
      <label htmlFor="collectionName">Collection Name</label>
      <input
        className="rounded border-2"
        name="collectionName"
        type="text"
        onChange={(e) => {
          setCollectionName(e.target.value)
        }}
      />
      <label htmlFor="symbol">Symbol</label>
      <input
        className="rounded border-2"
        name="symbol"
        type="text"
        onChange={(e) => {
          if (e.target.value.length <= 4) {
            setSymbol(e.target.value)
          } else {
            alert("The max lenght for this field is 4 character")
            e.target.value = e.target.value.slice(0, 4)
          }
        }}
      />
      <label htmlFor="maxSupply">Max supply</label>
      <input
        className="rounded border-2"
        name="maxSupply"
        type="number"
        onChange={(e) => {
          if (e.target.value >= 0) {
            setMaxSupply(e.target.value)
          } else {
            alert("Max supply must be greater than 0")
            e.target.value = 0
          }
        }}
      />
      <button className="rounded bg-blue-200 p-2 px-5 m-2" type="sumbit">
        Create
      </button>
    </form>
  )
}

export default NewCollectionForm
