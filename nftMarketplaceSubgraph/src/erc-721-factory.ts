import { Address } from "@graphprotocol/graph-ts"
import { NftContractCreated as NftContractCreatedEvent } from "../generated/ERC721Factory/ERC721Factory"
import { NftContractCreated } from "../generated/schema"

export function handleNftContractCreated(event: NftContractCreatedEvent): void {
  let nftContractCreated = NftContractCreated.load(
    getIdFromEventParams(event.params.name, event.params.contractAddress)
  )
  if (!nftContractCreated) {
    nftContractCreated = new NftContractCreated(
      getIdFromEventParams(event.params.name, event.params.contractAddress)
    )
  }
  nftContractCreated.name = event.params.name
  nftContractCreated.symbol = event.params.symbol
  nftContractCreated.maxSupply = event.params.maxSupply
  nftContractCreated.contractAddress = event.params.contractAddress
  nftContractCreated.owner = event.params.sender
  nftContractCreated.save()
}

function getIdFromEventParams(name: string, contractAddress: Address): string {
  return name + contractAddress.toString()
}
