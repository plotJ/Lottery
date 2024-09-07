"use client";

import type { NextPage } from 'next'
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'
import { connectWallet, getLotteryStatus, buyTokens, placeBet, openBets, closeLottery, claimPrize, getTokenBalance, burnTokens } from '../lib/contractInteractions'
import { ethers } from 'ethers'

const Home: NextPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lotteryStatus, setLotteryStatus] = useState({ betsOpen: false, closingTime: new Date() });
  const [tokenBalance, setTokenBalance] = useState('0');
  const [ethAmount, setEthAmount] = useState('');
  const [burnAmount, setBurnAmount] = useState('');

  useEffect(() => {
    async function init() {
      const connected = await connectWallet();
      setIsConnected(connected);
      if (connected) {
        updateLotteryStatus();
        updateTokenBalance();
      }
    }
    init();
  }, []);

  async function updateLotteryStatus() {
    const status = await getLotteryStatus();
    setLotteryStatus(status);
  }

  async function updateTokenBalance() {
    const balance = await getTokenBalance();
    setTokenBalance(ethers.utils.formatEther(balance));
  }

  async function handleBuyTokens() {
    if (isConnected && ethAmount) {
      await buyTokens(ethAmount);
      updateTokenBalance();
      setEthAmount('');
    }
  }

  async function handlePlaceBet() {
    if (isConnected) {
      await placeBet();
      updateTokenBalance();
    }
  }

  async function handleOpenBets() {
    if (isConnected) {
      await openBets(3600); // Open for 1 hour
      updateLotteryStatus();
    }
  }

  async function handleCloseLottery() {
    if (isConnected) {
      await closeLottery();
      updateLotteryStatus();
    }
  }

  async function handleClaimPrize() {
    if (isConnected) {
      await claimPrize();
      updateTokenBalance();
    }
  }

  async function handleBurnTokens() {
    if (isConnected && burnAmount) {
      await burnTokens(burnAmount);
      updateTokenBalance();
      setBurnAmount('');
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 text-black">
      <header className="flex items-center justify-between bg-white px-6 py-4">
        <div className="text-2xl font-bold">Decentralized Lottery</div>
        <nav className="flex items-center gap-6">
          <Link href="#" className="hover:text-[#9ca3af]">
            Dashboard
          </Link>
          <Link href="#" className="hover:text-[#9ca3af]">
            My Account
          </Link>
          <Link href="#" className="hover:text-[#9ca3af]">
            Admin Panel
          </Link>
        </nav>
      </header>
      <main className="flex-1 px-6 py-8">
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-bold">Lottery Status</div>
              <div className="text-[#9ca3af]">{lotteryStatus.betsOpen ? 'Open' : 'Closed'}</div>
            </div>
            <div>
              <div className="text-lg font-bold">Time Remaining</div>
              <div className="text-[#9ca3af]">
                {lotteryStatus.betsOpen 
                  ? `${Math.max(0, Math.floor((lotteryStatus.closingTime.getTime() - Date.now()) / 1000))} seconds` 
                  : 'N/A'}
              </div>
            </div>
            <div>
              <div className="text-lg font-bold">Your Token Balance</div>
              <div className="text-[#9ca3af]">{tokenBalance} LT</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="rounded-lg bg-gray-200 p-6">
              <div className="mb-4 text-lg font-bold text-black">Buy Tokens</div>
              <div className="mb-4 flex items-center gap-4">
                <Input
                  type="number"
                  placeholder="Enter ETH amount"
                  value={ethAmount}
                  onChange={(e) => setEthAmount(e.target.value)}
                  className="flex-1 rounded-md bg-gray-200 px-4 py-2 text-black"
                />
              </div>
              <Button onClick={handleBuyTokens} className="w-full rounded-md bg-[#3b82f6] py-2 font-bold text-white">Purchase</Button>
            </div>
            <div className="rounded-lg bg-gray-200 p-6">
              <div className="mb-4 text-lg font-bold text-black">Place Bet</div>
              <Button onClick={handlePlaceBet} className="w-full rounded-md bg-[#3b82f6] py-2 font-bold text-white">Place Bet</Button>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <div className="mb-4 text-lg font-bold">Admin Panel</div>
          <div className="rounded-lg bg-gray-200 p-6">
            <div className="mb-4 flex items-center justify-between">
              <Button onClick={handleOpenBets} className="rounded-md bg-[#3b82f6] py-2 px-4 font-bold">Open Lottery</Button>
              <Button onClick={handleCloseLottery} className="rounded-md bg-[#3b82f6] py-2 px-4 font-bold">Close Lottery</Button>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <div className="mb-4 text-lg font-bold">My Account</div>
          <div className="grid grid-cols-2 gap-8">
            <div className="rounded-lg bg-gray-200 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-black">Token Balance</div>
                  <div className="text-2xl font-bold">{tokenBalance} LT</div>
                </div>
                <Button onClick={handleClaimPrize} className="rounded-md bg-[#3b82f6] py-2 px-4 font-bold">Claim Prize</Button>
              </div>
              <div className="mb-4 flex items-center gap-4">
                <Input
                  type="number"
                  placeholder="Enter token amount"
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(e.target.value)}
                  className="flex-1 rounded-md bg-gray-200 px-4 py-2 text-black"
                />
              </div>
              <Button onClick={handleBurnTokens} className="w-full rounded-md bg-[#9ca3af] py-2 font-bold">Burn Tokens</Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-[#9ca3af]">&copy; 2024 Decentralized Lottery</div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-[#9ca3af]">
              GitHub
            </Link>
            <Link href="#" className="hover:text-[#9ca3af]">
              Docs
            </Link>
            <Link href="#" className="hover:text-[#9ca3af]">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home