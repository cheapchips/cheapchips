# **CheapChips**
A fully automated and decentralized online lottery game using Chainlink services [Chainlink VRF V2](https://docs.chain.link/vrf/v2/introduction) & [Chainlink Automation](https://automation.chain.link/).

<!-- Demo link: -->
<!-- You can give this a try. -->

## Table of Contents
1. [What is CheapChips about?](#about)
2. [How does this work?](#work)
3.  [Tech stack](#stack)
4. [How to setup and run](#setup)
5. [Future plans](#plans)
    1. [Testnet](#testnet)
    2. [Mainnet](#mainnet)
6. [Credits](#credits)

<a id="about"></a>
## What is CheapChips about? 

Consider a "classic", centralized online game of chance, e.g. Roulette, Poker, Blackjack etc. In order to play and win, you have to trust third parties who are in control of the game system. A "random" game result coming from a centralized party should not be enough for users, because it is not externally verifiable. A centralized party could manipulate the win chances for a specific player for many undisclosed reasons, like business strategies. A problem of trust arises, and to fix that, we would need a fully decentralized and independent game system. That system would have to provide reliable, truly random, verifiable game results each consecutive time. That system should also not be controlled by anyone, making it fully autonomous and independent. We managed to build a system exactly like this - CheapChips.

Check out our [whitepaper](/docs/whitepaper/whitepaper.pdf) to fully understand all the mechanisms CheapChips is using to function.

<a id="work"></a>
## How does this work?

The CheapChips project is divided into three essential parts:
1. The CheapChipsJackpot smart contract
2. The ChipStable (ERC20) token contract
3. Online application for intuitive end-user experience

### 1. The CheapChipsJackpot contract

This is the core component - a smart contract responsible for handling game rounds, players, random game result (VRF-generated value), tickets, ChipStable token transfers and Chainlink Automation calls.

### 2. The ChipStable (ERC20) token contract

ChipStable is the game currency - an ERC20 token with 0 decimals. In future (Mainnet release) it will be a stablecoin whose value will be equal to one (1) USD due to coverage in other popular stablecoins. 

### 3. Online application for intuitive end-user experience

A website where players can play in real-time, deposit and withdraw their ChipStable tokens and game winnings.

<a id="stack"></a>
## Tech stack
For the smart contracts development we used the Hardhat framework.
Smart contracts (located in `/contracts`) were written in Solidity and are using @openzeppelin/contracts, @chainlink/contracts and @uniswap libraries.

Frontend (located in `/app`) is written entirely in React using Vite. It's using ethers.js library for browser-blockchain connectivity and TailwindCSS for styling components.

All icons used in our frontend app were downloaded from UXWing and are free for commercial use. https://uxwing.com/license

<a id="setup"></a>
## How to setup and run

1. Clone the repository:
```
git clone https://github.com/cheapchips/cheapchips
```

2. Generate typechain - types required for frontend
```
cd contracts
yarn
yarn hardhat typechain
```

3. Run frontend locally
```
cd ../app
yarn
yarn dev
```

<a id="plans"></a>
## Future plans

<a id="testnet"></a>
### Testnet

We would like to introduce an achievement system in our dapp. Active players would be awarded for their commitment to the app.
We are also thinking about a governance token which would reward of active players.

CheapChips Governance token holders will be able to modify the limitations and parameters of the games - e.g. The amount of minimum players required to start a certain game of chance, maximum amount of deposit to play and many more.
This token would act as a player's voting power - the more tokens a player owns, the more vote power he has. Implementing this token would be a big step towards making CheapChips a DAO - the players will be able to choose the direction in which the project will develop. We as developers would also be commited to the decisions made during DAO votes. 

We will also likely implement more games of chance available alongside the classic CheapChips Jackpot game - right now we're thinking about some sort of coinflip game / Chips duel for those who prefer a solo experience.

<a id="mainnet"></a>
### Mainnet

We still need to make sure everything is exploit and bug-free before releasing the app to Mainnet. Apart from the ChipStable coin having coverage in USD, not much will change in terms of game mechanics.
We need more time to fully test every feature and triple check everything, a mainnet release is planned for the end of 2023.

<a id="credits"></a>
## Credits
Made with ❤️ by [@el-tumero](https://github.com/el-tumero) and [@teavver](https://github.com/teavver).