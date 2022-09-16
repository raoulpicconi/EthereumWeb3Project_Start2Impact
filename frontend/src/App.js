import Header from "./components/Header/Header"
import ConnectButton from "./components/Common/ConnectButton"
import InstallMetamask from "./components/InstallMetamask"
import InvalidChainId from "./components/InvalidChainId"
import networkMapping from "./constants/networkMapping.json"
import { ethers } from "ethers"
import { useEffect, useState, createContext } from "react"

export const UserContext = createContext()

function App() {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isValidChainId, setIsValidChainId] = useState(false)
  const [address, setAddress] = useState("")
  const [signer, setSigner] = useState(undefined)

  let provider

  useEffect(() => {
    if (window.ethereum !== undefined) {
      setIsMetamaskInstalled(true)
      addListeners()
    } else {
      setIsMetamaskInstalled(false)
    }
    if (window.location.hash === "#reload") {
      handleConnection()
    }
  }, [])

  useEffect(() => {
    if (signer !== undefined) {
      signer.getAddress().then((signerAddress) => {
        setAddress(signerAddress)
      })
    }
  }, [signer])

  useEffect(() => {
    if (address === undefined || !address.includes("0x")) {
      setIsConnected(false)
    } else {
      setIsConnected(true)
    }
  }, [address])

  function addListeners() {
    window.ethereum.on("accountsChanged", (accounts) => {
      setAddress(accounts[0])
    })
    window.ethereum.on("chainChanged", (chainId) => {
      if (networkMapping.hasOwnProperty(Number(chainId))) {
        setIsValidChainId(true)
        window.location.hash = "reload"
        window.location.reload()
        handleConnection()
      } else {
        setIsValidChainId(false)
      }
    })
  }

  async function handleConnection() {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      setSigner(provider.getSigner())
    } catch (err) {
      console.error(err)
      setIsConnected(false)
    }
    if (networkMapping.hasOwnProperty(Number(window.ethereum.chainId))) {
      setIsValidChainId(true)
    }
  }

  if (isConnected && !isValidChainId) {
    return <InvalidChainId />
  }

  return (
    <div>
      {!isMetamaskInstalled ? (
        <InstallMetamask />
      ) : !isConnected ? (
        <ConnectButton handleConnection={handleConnection} />
      ) : (
        <UserContext.Provider value={{ address: address, signer: signer }}>
          <Header />
        </UserContext.Provider>
      )}
    </div>
  )
}

export default App
