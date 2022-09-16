# DEX NFT

This is a little PoC of a fully decentralized NFT marketplace. The web app allows you to login with Metamask or Brave wallet, select the chain (2 testnet supported at the moment) sell, buy, mint NFT and create a new ERC721(the NFT standard) contract without writing a single line of code. The project doesn't have a backend to maintain the decentralization but uses the graph protocol to index the blockchain events and retrieve the marketplace data.
This website is stored on ipfs and can be found at this [link](https://ipfs.io/ipfs/QmNyh6KqsChL4WRuZVoqn7BaWyAaTqVhp6x8J7tAAi1bvZ).

## Project folder

There are 3 main folders, the frontend folder stores the react application, the smartcontract folder stores the hardhat development environmet to build and deploy smartcontracts, if you like this type of environment please check my project to bootstraped it: [create-harhdat-project](https://github.com/raoulpicconi/create-hardhat-project). The nftMarketplaceSubgraph stores the the-graph configurations.

## Technologies

### Frontend

- [React](https://it.reactjs.org/)
- [ethers](https://docs.ethers.io/v5/)
- [Apollo-client](https://github.com/apollographql/apollo-client)
- [Nft.storage](https://nft.storage/)
- [Tailwind](https://tailwindcss.com/docs/installation)

### Smartcontracts

- [Hardhat](https://hardhat.org/)
- [hardhat-deploy](https://github.com/wighawag/hardhat-deploy)
- [create-hardhat-project](https://github.com/raoulpicconi/create-hardhat-project)

## Run the project locally

1. Clone the repository
2. Move into frontend

```sh
cd frontend
```

2. Install the dependency

```sh
yarn install
```

3. Update .env.example and rename it to .env
4. Run the server

```sh
yarn start
```

## Do you like the project?

Leave a ⭐️ and contact me on [Linkedin](https://www.linkedin.com/in/raoulpicconi).
