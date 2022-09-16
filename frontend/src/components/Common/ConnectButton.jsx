function ConnectButton({ handleConnection }) {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="h-1/2">
        <h1 className="font-bold text-3xl">You need to connect your wallet to use this DAPP</h1>
        <h3 className="text-xl">
          If you don't have any wallet or you don't know how to use a Dapp, click on this{" "}
          <a className="underline text-blue-400" href="https://metamask.io/">
            link
          </a>
          .
        </h3>
        <p>
          Supported wallet:
          <ul className="">
            <li>Metamsk</li>
            <li>Brave Wallet</li>
          </ul>
        </p>
        <div className="flex justify-center">
          <button
            className="border-4 border-blue-300 rounded text-blue-300 p-1 px-3 text-4xl font-bold hover:scale-125 duration-100"
            onClick={() => handleConnection()}
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConnectButton
