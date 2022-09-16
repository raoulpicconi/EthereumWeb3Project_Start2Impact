import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import subgraphMapping from "./constants/subgraphsMapping"
import "./index.css"

let client
if (window.ethereum) {
  const chainId = Number(window.ethereum.chainId)
  client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: subgraphMapping[chainId],
  })
} else {
  client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "",
  })
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
