import { useQuery, gql } from "@apollo/client"
import { useContext } from "react"
import { UserContext } from "../../App"

function NftAddressSuggestions() {
  const { address } = useContext(UserContext)
  const CONTRACT_ADDRESS_FOR_OWNER_QUERY = gql`
    query GetAddress($address: String!) {
      nftContractCreateds(first: 5, where: { owner: $address }) {
        id
        name
        symbol
        maxSupply
        owner
        contractAddress
      }
    }
  `
  const {
    loading,
    error,
    data: contractAddressForOwner,
  } = useQuery(CONTRACT_ADDRESS_FOR_OWNER_QUERY, { variables: { address } })
  if (error) return "Error!"
  if (loading) return "Loading!"

  if (contractAddressForOwner) {
    return (
      <>
        <datalist id="nftAddresses">
          {contractAddressForOwner &&
            contractAddressForOwner.nftContractCreateds.map((nftAddress) => {
              return (
                <option key={nftAddress.id} value={nftAddress.contractAddress}>
                  {nftAddress.name}: {nftAddress.contractAddress.slice(0, 6)}...
                  {nftAddress.contractAddress.slice(-6)}
                </option>
              )
            })}
        </datalist>
      </>
    )
  }
}

export default NftAddressSuggestions
