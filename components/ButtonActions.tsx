'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAccount, useWriteContract } from 'wagmi';
import { abi } from "@/app/abi";
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { wagmiConfig } from "@/components/wallet-providers";
import { readContract } from 'wagmi/actions';

// Define the contract address as a global constant
const CONTRACT_ADDRESS = '0x31717fD782f9070d6bCFdA3d73102013E0A30354';



export function AddNewTokenButton() {
  const { isConnected } = useAccount();
  const { data: hash, writeContract } = useWriteContract();
  const addRecentTransaction = useAddRecentTransaction();
  const tokensList: { [key: string]: any } = {};
  const [input, setInput] = useState("");

  async function handleAddNewToken(input: string) {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: "addToken",
        args: [input],
      });

      // Use the global readTokens function

      // Add transaction to recent transactions
      if (hash) {
        console.log("hash: ", hash);
        addRecentTransaction({
          hash: hash,
          description: "Added token called " + input,
          confirmations: 2,
        });
      }
    } catch (error) {
      console.error("Error adding new token:", error);
    }
  }

  return (
    <>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter token name"
      />
      <Button
        onClick={() => {
          handleAddNewToken(input).catch((error) => {
            console.error("Error adding new token:", error);
          });
        }}
        className="mt-3"
      >
        Add New Token
      </Button>
    </>
  );
}


export function MintTokensButton() {
  const { isConnected } = useAccount();
  const { data: hash, writeContract } = useWriteContract();
  const addRecentTransaction = useAddRecentTransaction();
  const tokensList: { [key: string]: any } = {};
  const [tokenID, setTokenID] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");

  async function mintTokens(tokenID: string, amount: number) {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: "mintToken",
        args: [tokenID, amount],
      });

      // Add transaction to recent transactions
      if (hash) {
        console.log("hash: ", hash);
        addRecentTransaction({
          hash: hash,
          description: `New token minted for ${tokenID}, amount: ${amount}`,
          confirmations: 2,
        });
      }
    } catch (error) {
      console.error("Error minting tokens:", error);
    }
  }

  return (
    <>
      <input
        type="text"
        value={tokenID}
        onChange={(e) => setTokenID(e.target.value)}
        placeholder="Enter Token name"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter Amount"
      />
      <Button
        onClick={() => {
          if (tokenID && amount) {
            mintTokens(tokenID, amount).catch((error) => {
              console.error("Error minting tokens:", error);
            });
          } else {
            console.error("Invalid Token ID or Amount");
          }
        }}
        className="mt-3"
      >
        Mint Tokens
      </Button>
    </>
  );
}


export function RedeemTokensButton() {
  const { isConnected } = useAccount();
  const { data: hash, writeContract } = useWriteContract();
  const addRecentTransaction = useAddRecentTransaction();
  const tokensList: { [key: string]: any } = {};
  const [tokenName, setTokenName] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");

  async function redeemTokens(tokenName: string, amount: number) {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: "redeemToken",
        args: [tokenName, amount],
      });

      // Add transaction to recent transactions
      if (hash) {
        console.log("hash: ", hash);
        addRecentTransaction({
          hash: hash,
          description: `Redeemed token for ${tokenName}, amount: ${amount}`,
          confirmations: 2,
        });
      }
    } catch (error) {
      console.error("Error redeeming tokens:", error);
    }
  }

  return (
    <>
      <input
        type="text"
        value={tokenName}
        onChange={(e) => setTokenName(e.target.value)}
        placeholder="Enter Token Name"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter Amount"
      />
      <Button
        onClick={() => {
          if (tokenName && amount) {
            redeemTokens(tokenName, amount).catch((error) => {
              console.error("Error redeeming tokens:", error);
            });
          } else {
            console.error("Invalid Token Name or Amount");
          }
        }}
        className="mt-3"
      >
        Redeem Tokens
      </Button>
    </>
  );
}

