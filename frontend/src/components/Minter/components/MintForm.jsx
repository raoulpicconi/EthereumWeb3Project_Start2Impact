import { useContext, useState } from "react"
import ERC721Abi from "../../../constants/myERC721.json"
import NftAddressSuggestions from "../../Common/NftAddressSuggestions"
import { NFTStorage, File } from "nft.storage"
import { ethers } from "ethers"
import { UserContext } from "../../../App"

function MintForm() {
  const [nftAddress, setNftAdress] = useState("")
  const [nftImage, setNftImage] = useState(null)
  const [resetImage, setResetImage] = useState(0)
  const [nftDescription, setNftDescription] = useState("")
  const [nftName, setNftName] = useState("")

  const { address, signer } = useContext(UserContext)

  const NFT_STORAGE_API_KEY = process.env.REACT_APP_NFT_STORAGE_API_KEY
  const nftStorage = new NFTStorage({
    token: NFT_STORAGE_API_KEY,
  })

  async function mintNewNft() {
    if (nftImage !== null) {
      const imageFile = new File([nftImage], nftImage.name, { type: nftImage.type })
      const metadata = await nftStorage.store({
        name: nftName,
        description: nftDescription,
        image: imageFile,
      })
      const nftContract = new ethers.Contract(nftAddress, ERC721Abi.abi, signer)
      await nftContract.mint(metadata.url)
    } else {
      alert("You have to upload an image to mint the nft!")
    }
  }

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={(e) => {
        e.preventDefault()
        mintNewNft()
        setNftAdress("")
        setNftDescription("")
        setNftName("")
        setNftImage(null)
        setResetImage(Math.random())
      }}
    >
      <label htmlFor="nftAddress">Address</label>
      <input
        className="rounded border-2"
        name="nftAddress"
        type="text"
        list="nftAddresses"
        value={nftAddress}
        onChange={(e) => {
          setNftAdress(e.target.value)
        }}
      />
      <NftAddressSuggestions address={address} />
      <label htmlFor="nftName">Name</label>
      <input
        className="rounded border-2"
        name="nftName"
        type="text"
        value={nftName}
        onChange={(e) => {
          setNftName(e.target.value)
        }}
      />
      <label htmlFor="description">Description</label>
      <input
        className="rounded border-2"
        name="description"
        type="text"
        value={nftDescription}
        onChange={(e) => {
          setNftDescription(e.target.value)
        }}
      />
      <label htmlFor="image">Image</label>
      <input
        className="rounded border-2"
        name="image"
        type="file"
        key={resetImage}
        onChange={(e) => {
          setNftImage(e.target.files[0])
        }}
      />
      <button className="rounded bg-blue-200 p-2 px-5 m-2" type="submit">
        Mint
      </button>
    </form>
  )
}

export default MintForm
