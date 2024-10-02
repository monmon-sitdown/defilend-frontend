# DeFi Lending Platform - React Application

## Overview

The DeFi Lending Platform is a decentralized application (DApp) built using React that allows users to deposit, withdraw, borrow, and repay tokens on a lending platform. This application interacts with the Ethereum blockchain, specifically with a smart contract that manages lending operations.
You can also find this app at https://simple-defilending.netlify.app . However, since it requires to connect to Ganache network, so it will not work. I am preparing to achieve it on Sepolia Testnet.

## Features

- **User Wallet Connection**: Connects to the user's Ethereum wallet using MetaMask.
- **Token Management**: Displays user balances, deposits, and borrowings in real-time.
- **Deposit and Withdraw**: Allows users to deposit tokens into the lending platform and withdraw them as needed.
- **Borrow and Repay**: Users can borrow tokens based on their deposits and repay borrowed amounts.
- **Interest Calculation**: Displays the total interest owed on borrowed amounts.
- **Transaction Feedback** : Provides users with success and error messages for transactions.

## Prerequisites

- Node.js (version >= 14.x)
- A web browser with MetaMask installed

## Installation

1. Clone the Repository:

```
git clone https://github.com/monmon-sitdown/defilend-frontend.git
cd defilend-frontend
```

2. Install Dependencies:

```
npm install
```

3. Run the Application:

```
npm start
```

The application will open in your default web browser at http://localhost:3000.

## Configuration

Make sure to replace the contract addresses in the code with the addresses of your deployed contracts:

```
const LENDING_PLATFORM_ADDRESS = "0x94f394Db5e958E296670BF494c723B6fab52d3fD"; // Replace with your contract address
const LENDING_TOKEN_ADDRESS = "0x36bFCebFfcAac1E6d6C2Dc39f2C7a2190359754B"; // Replace with your token address
```

## Usage

1. **Connect Wallet**: Click on the "Connect" button to link your MetaMask wallet to the application.
2. **View Balances**: Once connected, you can see your token balance, deposits, borrowings, and the interest owed.
3. **Deposit Tokens**: Enter the amount of tokens you wish to deposit and click the "Deposit" button.
4. **Withdraw Tokens**: Enter the amount you wish to withdraw and click the "Withdraw" button.
5. **Borrow Tokens**: Enter the desired amount to borrow and click the "Borrow" button.
6. **Repay Tokens**: Enter the repayment amount and click the "Repay" button.

## Error Handling

The application provides feedback for successful and failed transactions. Users will see alerts on the screen indicating the result of their actions.

## Technology Stack

- **React**: A JavaScript library for building user interfaces.
- **Ethers.js**: A library for interacting with the Ethereum blockchain.
- **OpenZeppelin**: Used for secure smart contract development.
