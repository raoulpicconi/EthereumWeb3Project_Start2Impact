import networkMapping from "../../../constants/networkMapping.json"

function NetworkSwitch() {
  async function switchChain(chainId) {
    try {
      switchRequest(chainId)
    } catch (switchError) {
      if (switchError.code === 4902) {
        addChain(chainId)
      } else {
        console.error(switchError)
      }
    }
  }

  async function switchRequest(chainId) {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainId }],
    })
  }

  async function addChain(chainId) {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: chainId,
            chainName: networkMapping[chainId].name,
            rpcUrls: [`https://${networkMapping.chainId.name}.infura.io/v3/`],
          },
        ],
      })
    } catch (addError) {
      console.error(addError)
    }
  }

  return (
    <>
      <select
        className="text-blue-500 border-blue-500 border-2 rounded p-1 md:p-2"
        value={window.ethereum.chainId}
        onChange={(e) => {
          switchChain(e.target.value)
        }}
      >
        {Object.keys(networkMapping).map((chainNumber, i) => {
          const chainId = "0x" + chainNumber
          return (
            <option className="" key={i} value={chainId}>
              {networkMapping[chainNumber].name}
            </option>
          )
        })}
      </select>
    </>
  )
}

export default NetworkSwitch
