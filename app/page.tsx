import { ConnectButton, useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AddNewTokenButton, MintTokensButton, RedeemTokensButton } from "@/components/ButtonActions";
import { Button } from '@/components/ui/button';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { abi } from "@/app/abi";
import { wagmiConfig } from "@/components/wallet-providers";
import { readContract } from 'wagmi/actions';
import { useState } from 'react';
const { isConnected } = useAccount();
const { data: hash, writeContract } = useWriteContract();
const addRecentTransaction = useAddRecentTransaction();
const CONTRACT_ADDRESS = '0x3C29D937B1B9D6DaBaC8CE733595F1cBB0E0b3DF';
const tokensList: { [key: string]: any } = {};

function Page() {

  async function readTokens(input: string) {
    const tokens = await readContract(wagmiConfig, {
      abi: abi,
      address: CONTRACT_ADDRESS,
      functionName: "getToken",
      args: [input],
    });
    console.log("numberOfGumballs for : " + input, tokens);
    tokensList[input] = tokens;
  }
  async function addToken(input: string) {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: abi,
      functionName: "addToken",
      args: [input],
    });
    // update state with new gumball count from contract
    await readTokens(input);
    // add transaction to recent transactions
    if (hash) {
      console.log("hash: ", hash);
      addRecentTransaction({
        hash: hash,
        description: "added token called " + input,
        confirmations: 2,
      });
    }
  }
  async function mintTokens(tokenID: number, amount: number) {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: abi,
      functionName: "mintToken",
      args: [tokenID, amount],
    });
    // update state with new gumball count from contract
    //await readTokens(input);
    // add transaction to recent transactions
    if (hash) {
      console.log("hash: ", hash);
      addRecentTransaction({
        hash: hash,
        description: "new token minted for " + tokenID + " amount " + amount,
        confirmations: 2,
      });
    }
  }
  async function redeemTokens(tokenID: number, amount: number) {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: abi,
      functionName: "redeemToken",
      args: [tokenID, amount],
    });
    // update state with new gumball count from contract
    //await readTokens(input);
    // add transaction to recent transactions
    if (hash) {
      console.log("hash: ", hash);
      addRecentTransaction({
        hash: hash,
        description: "redeemed token for " + tokenID + " amount " + amount,
        confirmations: 2,
      });
    }
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        padding: 12,
      }}
    >
      <Card className="ml-10">
        <CardHeader>
          <CardTitle>Add New Token</CardTitle>
          <CardDescription>Create a new token for a new celebrity</CardDescription>
        </CardHeader>
        <CardContent>
          <AddNewTokenButton />
        </CardContent>
      </Card>

      <Card className="ml-10">
        <CardHeader>
          <CardTitle>Mint More Tokens</CardTitle>
          <CardDescription>Mint additional tokens for existing celebrities</CardDescription>
        </CardHeader>
        <CardContent>
            <MintTokensButton />
        </CardContent>
      </Card>

      <Card className="ml-10">
        <CardHeader>
          <CardTitle>Redeem Tokens</CardTitle>
          <CardDescription>Redeem your tokens for rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <RedeemTokensButton />
        </CardContent>
      </Card>

      <div className="ml-auto">
        <ConnectButton />
      </div>
    </div>
  );
}

export default Page;
