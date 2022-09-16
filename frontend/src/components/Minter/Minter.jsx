import { useState } from "react"
import NewCollectionForm from "./components/NewCollectionForm"
import MintForm from "./components/MintForm"

function Minter() {
  const [isNewCollection, setIsNewCollection] = useState(false)

  return (
    <>
      <select
        className="text-blue-500 border-blue-500 border-2 rounded p-2 ml-5"
        onChange={(e) => {
          setIsNewCollection(e.target.value)
        }}
      >
        <option value="false">Mint new NFT</option>
        <option value="true">Create new Collection</option>
      </select>
      {isNewCollection === "true" ? <NewCollectionForm /> : <MintForm />}
    </>
  )
}
export default Minter
