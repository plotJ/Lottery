import type { NextPage } from 'next'
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#1a1b1e] text-white">
      <header className="flex items-center justify-between bg-[#1f2023] px-6 py-4">
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
              <div className="text-[#9ca3af]">Open</div>
            </div>
            <div>
              <div className="text-lg font-bold">Time Remaining</div>
              <div className="text-[#9ca3af]">12:34</div>
            </div>
            <div>
              <div className="text-lg font-bold">Prize Pool</div>
              <div className="text-[#9ca3af]">10 ETH</div>
            </div>
            <div>
              <div className="text-lg font-bold">Participants</div>
              <div className="text-[#9ca3af]">1,234</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="rounded-lg bg-[#1f2023] p-6">
              <div className="mb-4 text-lg font-bold">Buy Tokens</div>
              <div className="mb-4 flex items-center gap-4">
                <Input
                  type="number"
                  placeholder="Enter ETH amount"
                  className="flex-1 rounded-md bg-[#2a2b2f] px-4 py-2 text-white"
                />
                <div className="text-[#9ca3af]">= 1,000 Tokens</div>
              </div>
              <Button className="w-full rounded-md bg-[#3b82f6] py-2 font-bold">Purchase</Button>
            </div>
            <div className="rounded-lg bg-[#1f2023] p-6">
              <div className="mb-4 text-lg font-bold">Place Bet</div>
              <div className="mb-4 flex items-center gap-4">
                <div className="text-[#9ca3af]">Token Balance: 1,000</div>
                <Input
                  type="number"
                  placeholder="Enter bet amount"
                  className="flex-1 rounded-md bg-[#2a2b2f] px-4 py-2 text-white"
                />
              </div>
              <Button className="w-full rounded-md bg-[#3b82f6] py-2 font-bold">Place Bet</Button>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <div className="mb-4 text-lg font-bold">Lottery Results</div>
          <div className="rounded-lg bg-[#1f2023] p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-[#9ca3af]">Winning Number</div>
                <div className="text-2xl font-bold">7</div>
              </div>
              <div>
                <div className="text-[#9ca3af]">Winner</div>
                <div className="text-2xl font-bold">0x123...456</div>
              </div>
              <div>
                <div className="text-[#9ca3af]">Prize</div>
                <div className="text-2xl font-bold">10 ETH</div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <div className="mb-4 text-lg font-bold">My Account</div>
          <div className="grid grid-cols-2 gap-8">
            <div className="rounded-lg bg-[#1f2023] p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[#9ca3af]">Token Balance</div>
                  <div className="text-2xl font-bold">1,000</div>
                </div>
                <Button className="rounded-md bg-[#3b82f6] py-2 px-4 font-bold">Claim Prize</Button>
              </div>
              <Button className="w-full rounded-md bg-[#9ca3af] py-2 font-bold">Burn Tokens</Button>
            </div>
            <div className="rounded-lg bg-[#1f2023] p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[#9ca3af]">Prizes Won</div>
                  <div className="text-2xl font-bold">5 ETH</div>
                </div>
                <Button className="rounded-md bg-[#3b82f6] py-2 px-4 font-bold">Withdraw</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <div className="mb-4 text-lg font-bold">Admin Panel</div>
          <div className="rounded-lg bg-[#1f2023] p-6">
            <div className="mb-4 flex items-center justify-between">
              <Button className="rounded-md bg-[#3b82f6] py-2 px-4 font-bold">Open Lottery</Button>
              <Button className="rounded-md bg-[#3b82f6] py-2 px-4 font-bold">Close Lottery</Button>
              <Button className="rounded-md bg-[#3b82f6] py-2 px-4 font-bold">Withdraw Fees</Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#1f2023] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-[#9ca3af]">&copy; 2024 Decentralized Lottery</div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-[#9ca3af]" prefetch={false}>
              GitHub
            </Link>
            <Link href="#" className="hover:text-[#9ca3af]" prefetch={false}>
              Docs
            </Link>
            <Link href="#" className="hover:text-[#9ca3af]" prefetch={false}>
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
      <footer className="bg-[#1f2023] px-6 py-4">
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
      