import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { NftContractCreated } from "../generated/ERC721Factory/ERC721Factory"

export function createNftContractCreatedEvent(
  name: string,
  symbol: string,
  maxSupply: BigInt,
  contractAddress: Address,
  sender: Address
): NftContractCreated {
  let nftContractCreatedEvent = changetype<NftContractCreated>(newMockEvent())

  nftContractCreatedEvent.parameters = new Array()

  nftContractCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  nftContractCreatedEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromString(symbol))
  )
  nftContractCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "maxSupply",
      ethereum.Value.fromUnsignedBigInt(maxSupply)
    )
  )
  nftContractCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "contractAddress",
      ethereum.Value.fromAddress(contractAddress)
    )
  )
  nftContractCreatedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return nftContractCreatedEvent
}
