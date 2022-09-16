import NetworkSwitch from "./Header/components/NetworkSwitch"
function InvalidChainId() {
  return (
    <>
      <div>Invalid chain Id, please switch to allowed network!</div>
      <NetworkSwitch />
    </>
  )
}

export default InvalidChainId
