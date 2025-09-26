'use client'

import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useState } from "react";

export default function Home() {
  const [publicKey, setPublicKey] = useState("")
  const [balance, setBalance] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  const fetchBalance = async () => {
    setError(null)
    setBalance(0)

    try {
      new PublicKey(publicKey)
    } catch (error) {
      setError("Invalid public key")
      return
    }

    const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=094ffd7b-6c2f-4ff7-8e66-424ce3822055", "confirmed")
    const accountInfo = await connection.getAccountInfo(new PublicKey(publicKey))

    if (!accountInfo) {
      setError("Account not found")
      return
    }

    const balance = accountInfo?.lamports / LAMPORTS_PER_SOL
    setBalance(balance)
  }

  return (
    <div className="p-12 flex flex-col gap-4">
      <p>Example address: DmWYFzjZeQKgwEF9Ytz6Bx9jckvwSQCoQLbnB77Zhf3L</p>

      <input type="text" placeholder="Enter public key" className="border p-5" value={publicKey} onChange={(e) => setPublicKey(e.target.value)} />
      <button className="bg-black text-white p-4" onClick={fetchBalance}>Fetch balance</button>

      <div>Balance: {balance} SOL</div>

      {error && <div className="text-red-500">{error}</div>}
    </div>
  )
}
