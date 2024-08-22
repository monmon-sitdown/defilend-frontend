import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

// ABI imports (you'll need to generate these from your compiled contracts)
import LendingPlatformABI from "./abis/SimpleLendingPlatform.json";
import ERC20ABI from "./abis/LendingToken.json";

const DeFiLendingPlatform = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [lendingPlatform, setLendingPlatform] = useState(null);
  const [lendingToken, setLendingToken] = useState(null);
  const [userBalance, setUserBalance] = useState("0");
  const [userDeposits, setUserDeposits] = useState("0");
  const [userBorrowings, setUserBorrowings] = useState("0");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const LENDING_PLATFORM_ADDRESS = "0x94f394Db5e958E296670BF494c723B6fab52d3fD"; // Replace with your deployed contract address
  const LENDING_TOKEN_ADDRESS = "0x36bFCebFfcAac1E6d6C2Dc39f2C7a2190359754B"; // Replace with your deployed token address

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          const lendingPlatform = new ethers.Contract(
            LENDING_PLATFORM_ADDRESS,
            LendingPlatformABI,
            signer
          );
          const lendingToken = new ethers.Contract(
            LENDING_TOKEN_ADDRESS,
            ERC20ABI,
            signer
          );

          setProvider(provider);
          setSigner(signer);
          setLendingPlatform(lendingPlatform);
          setLendingToken(lendingToken);

          updateUserInfo(
            await signer.getAddress(),
            lendingPlatform,
            lendingToken
          );
        } catch (error) {
          setError("Failed to connect to Ethereum wallet.");
          console.error(error);
        }
      } else {
        setError("Ethereum wallet not detected. Please install MetaMask.");
      }
    };

    init();
  }, []);

  const updateUserInfo = async (userAddress, lendingPlatform, lendingToken) => {
    const balance = await lendingToken.balanceOf(userAddress);
    const deposits = await lendingPlatform.deposits(userAddress);
    const borrowings = await lendingPlatform.borrowings(userAddress);

    setUserBalance(ethers.utils.formatEther(balance));
    setUserDeposits(ethers.utils.formatEther(deposits));
    setUserBorrowings(ethers.utils.formatEther(borrowings));
  };

  const handleDeposit = async () => {
    try {
      const amountWei = ethers.utils.parseEther(amount);
      await lendingToken.approve(LENDING_PLATFORM_ADDRESS, amountWei);
      const tx = await lendingPlatform.deposit(amountWei);
      await tx.wait();
      setSuccess("Deposit successful!");
      updateUserInfo(await signer.getAddress(), lendingPlatform, lendingToken);
    } catch (error) {
      setError("Deposit failed. Please try again.");
      console.error(error);
    }
  };

  const handleWithdraw = async () => {
    try {
      const amountWei = ethers.utils.parseEther(amount);
      const tx = await lendingPlatform.withdraw(amountWei);
      await tx.wait();
      setSuccess("Withdrawal successful!");
      updateUserInfo(await signer.getAddress(), lendingPlatform, lendingToken);
    } catch (error) {
      setError("Withdrawal failed. Please try again.");
      console.error(error);
    }
  };

  const handleBorrow = async () => {
    try {
      const amountWei = ethers.utils.parseEther(amount);
      const tx = await lendingPlatform.borrow(amountWei);
      await tx.wait();
      setSuccess("Borrow successful!");
      updateUserInfo(await signer.getAddress(), lendingPlatform, lendingToken);
    } catch (error) {
      setError("Borrow failed. Please try again.");
      console.error(error);
    }
  };

  const handleRepay = async () => {
    try {
      const amountWei = ethers.utils.parseEther(amount);
      await lendingToken.approve(LENDING_PLATFORM_ADDRESS, amountWei);
      const tx = await lendingPlatform.repay(amountWei);
      await tx.wait();
      setSuccess("Repayment successful!");
      updateUserInfo(await signer.getAddress(), lendingPlatform, lendingToken);
    } catch (error) {
      setError("Repayment failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">DeFi Lending Platform</h1>
      <div className="mb-4">
        <p>Balance: {userBalance} LTK</p>
        <p>Deposits: {userDeposits} LTK</p>
        <p>Borrowings: {userBorrowings} LTK</p>
      </div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="border p-2 mr-2"
      />
      <button
        onClick={handleDeposit}
        className="bg-blue-500 text-white p-2 mr-2"
      >
        Deposit
      </button>
      <button
        onClick={handleWithdraw}
        className="bg-green-500 text-white p-2 mr-2"
      >
        Withdraw
      </button>
      <button
        onClick={handleBorrow}
        className="bg-yellow-500 text-white p-2 mr-2"
      >
        Borrow
      </button>
      <button onClick={handleRepay} className="bg-red-500 text-white p-2">
        Repay
      </button>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      {success && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {success}</span>
        </div>
      )}
    </div>
  );
};

export default DeFiLendingPlatform;
