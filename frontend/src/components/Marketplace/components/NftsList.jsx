import NftCard from "./NftCard"
function NftsList({ listedNfts, buyItem, cancelListing, updatePrice }) {
  return (
    <div className="flex flex-col md:flex-row mx-3">
      {listedNfts.activeItems.map((nft) => {
        const { price, nftAddress, tokenId, seller, id } = nft
        return (
          <NftCard
            buyItem={buyItem}
            cancelListing={cancelListing}
            updatePrice={updatePrice}
            nftAddress={nftAddress}
            tokenId={tokenId}
            seller={seller}
            price={price}
            key={id}
          />
        )
      })}
    </div>
  )
}

export default NftsList
