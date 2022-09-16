// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ItemBought extends ethereum.Event {
  get params(): ItemBought__Params {
    return new ItemBought__Params(this);
  }
}

export class ItemBought__Params {
  _event: ItemBought;

  constructor(event: ItemBought) {
    this._event = event;
  }

  get buyer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get nftAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get price(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class ItemCanceled extends ethereum.Event {
  get params(): ItemCanceled__Params {
    return new ItemCanceled__Params(this);
  }
}

export class ItemCanceled__Params {
  _event: ItemCanceled;

  constructor(event: ItemCanceled) {
    this._event = event;
  }

  get seller(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get nftAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ItemListed extends ethereum.Event {
  get params(): ItemListed__Params {
    return new ItemListed__Params(this);
  }
}

export class ItemListed__Params {
  _event: ItemListed;

  constructor(event: ItemListed) {
    this._event = event;
  }

  get seller(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get nftAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get price(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class NftMarketplace__getListingResultValue0Struct extends ethereum.Tuple {
  get price(): BigInt {
    return this[0].toBigInt();
  }

  get seller(): Address {
    return this[1].toAddress();
  }
}

export class NftMarketplace extends ethereum.SmartContract {
  static bind(address: Address): NftMarketplace {
    return new NftMarketplace("NftMarketplace", address);
  }

  getListing(
    nftAddress: Address,
    tokenId: BigInt
  ): NftMarketplace__getListingResultValue0Struct {
    let result = super.call(
      "getListing",
      "getListing(address,uint256):((uint256,address))",
      [
        ethereum.Value.fromAddress(nftAddress),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );

    return changetype<NftMarketplace__getListingResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getListing(
    nftAddress: Address,
    tokenId: BigInt
  ): ethereum.CallResult<NftMarketplace__getListingResultValue0Struct> {
    let result = super.tryCall(
      "getListing",
      "getListing(address,uint256):((uint256,address))",
      [
        ethereum.Value.fromAddress(nftAddress),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<NftMarketplace__getListingResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  getOwnerProceeds(): BigInt {
    let result = super.call(
      "getOwnerProceeds",
      "getOwnerProceeds():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getOwnerProceeds(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getOwnerProceeds",
      "getOwnerProceeds():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getProceeds(seller: Address): BigInt {
    let result = super.call("getProceeds", "getProceeds(address):(uint256)", [
      ethereum.Value.fromAddress(seller)
    ]);

    return result[0].toBigInt();
  }

  try_getProceeds(seller: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getProceeds",
      "getProceeds(address):(uint256)",
      [ethereum.Value.fromAddress(seller)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class BuyItemCall extends ethereum.Call {
  get inputs(): BuyItemCall__Inputs {
    return new BuyItemCall__Inputs(this);
  }

  get outputs(): BuyItemCall__Outputs {
    return new BuyItemCall__Outputs(this);
  }
}

export class BuyItemCall__Inputs {
  _call: BuyItemCall;

  constructor(call: BuyItemCall) {
    this._call = call;
  }

  get nftAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class BuyItemCall__Outputs {
  _call: BuyItemCall;

  constructor(call: BuyItemCall) {
    this._call = call;
  }
}

export class CancelListingCall extends ethereum.Call {
  get inputs(): CancelListingCall__Inputs {
    return new CancelListingCall__Inputs(this);
  }

  get outputs(): CancelListingCall__Outputs {
    return new CancelListingCall__Outputs(this);
  }
}

export class CancelListingCall__Inputs {
  _call: CancelListingCall;

  constructor(call: CancelListingCall) {
    this._call = call;
  }

  get nftAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class CancelListingCall__Outputs {
  _call: CancelListingCall;

  constructor(call: CancelListingCall) {
    this._call = call;
  }
}

export class ListItemCall extends ethereum.Call {
  get inputs(): ListItemCall__Inputs {
    return new ListItemCall__Inputs(this);
  }

  get outputs(): ListItemCall__Outputs {
    return new ListItemCall__Outputs(this);
  }
}

export class ListItemCall__Inputs {
  _call: ListItemCall;

  constructor(call: ListItemCall) {
    this._call = call;
  }

  get nftAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get price(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class ListItemCall__Outputs {
  _call: ListItemCall;

  constructor(call: ListItemCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpdateListingCall extends ethereum.Call {
  get inputs(): UpdateListingCall__Inputs {
    return new UpdateListingCall__Inputs(this);
  }

  get outputs(): UpdateListingCall__Outputs {
    return new UpdateListingCall__Outputs(this);
  }
}

export class UpdateListingCall__Inputs {
  _call: UpdateListingCall;

  constructor(call: UpdateListingCall) {
    this._call = call;
  }

  get nftAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get newPrice(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class UpdateListingCall__Outputs {
  _call: UpdateListingCall;

  constructor(call: UpdateListingCall) {
    this._call = call;
  }
}

export class WithdrawOwnerProceedsCall extends ethereum.Call {
  get inputs(): WithdrawOwnerProceedsCall__Inputs {
    return new WithdrawOwnerProceedsCall__Inputs(this);
  }

  get outputs(): WithdrawOwnerProceedsCall__Outputs {
    return new WithdrawOwnerProceedsCall__Outputs(this);
  }
}

export class WithdrawOwnerProceedsCall__Inputs {
  _call: WithdrawOwnerProceedsCall;

  constructor(call: WithdrawOwnerProceedsCall) {
    this._call = call;
  }
}

export class WithdrawOwnerProceedsCall__Outputs {
  _call: WithdrawOwnerProceedsCall;

  constructor(call: WithdrawOwnerProceedsCall) {
    this._call = call;
  }
}

export class WithdrawProceedsCall extends ethereum.Call {
  get inputs(): WithdrawProceedsCall__Inputs {
    return new WithdrawProceedsCall__Inputs(this);
  }

  get outputs(): WithdrawProceedsCall__Outputs {
    return new WithdrawProceedsCall__Outputs(this);
  }
}

export class WithdrawProceedsCall__Inputs {
  _call: WithdrawProceedsCall;

  constructor(call: WithdrawProceedsCall) {
    this._call = call;
  }
}

export class WithdrawProceedsCall__Outputs {
  _call: WithdrawProceedsCall;

  constructor(call: WithdrawProceedsCall) {
    this._call = call;
  }
}