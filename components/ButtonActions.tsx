'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { abi } from "@/app/abi";
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { wagmiConfig } from "@/components/wallet-providers";
import { readContract } from 'wagmi/actions';
//import { updateTokenCounts } from '@/lib/utils';

// Define the contract address as a global constant
const CONTRACT_ADDRESS = '0x31717fD782f9070d6bCFdA3d73102013E0A30354';

//this is illegal i cant export something then useeffect it
/*
Issues: 
2. I need to figure out how to make it so i call update token counts and then tokenCard is able to update using that info (I set a state variable to something and then tokenCard autoupdates even though they're different exports)
3. I want to figure out what can be inside of an export and what can't becuase it works to have contract address outside and i keep redefining the same variables as it is now
4. I have to redifine variables on each export and i don't like it
*/


export function AddNewTokenButton({ tokenData }: { tokenData: [any, React.Dispatch<React.SetStateAction<{ [key: string]: number }>>] }) {
  const { data: hash, writeContract } = useWriteContract();
  const addRecentTransaction = useAddRecentTransaction();
  const [input, setInput] = useState("");


  async function handleAddNewToken(input: string) {

    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: "addToken",
        args: [input],
      });


      // Reset input field
      setInput("");


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
  const { isSuccess: isConfirmed } =useWaitForTransactionReceipt({
    hash,
  })

  const [hasUpdated, setHasUpdated] = useState(false);

  useEffect(() => {
    if (isConfirmed && !hasUpdated) {
      updateTokenInfo(tokenData);
      setHasUpdated(true);
    }
  }, [isConfirmed, hasUpdated, tokenData]);

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
          if (input.trim() !== "") {
            handleAddNewToken(input).catch((error) => {
              console.error("Error adding new token:", error);
            });
          } else {
            console.error("Token name cannot be empty");
          }
        }}
        className="mt-3"
      >
        Add New Token
      </Button>
    </>
  );
}


export function MintTokensButton({ tokenData }: { tokenData: [any, React.Dispatch<React.SetStateAction<{ [key: string]: number }>>] }) {
  const { data: hash, writeContract } = useWriteContract();
  const addRecentTransaction = useAddRecentTransaction();
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

      // Reset input fields
      setTokenID("");
      setAmount("");


      // Add transaction to recent transactions
      if (hash) {
        console.log("hash: ", hash);
        addRecentTransaction({
          hash: hash,
          description: `New token minted for ${tokenID}, amount: ${amount}`,
          confirmations: 2,
        });
      }
      updateTokenInfo(tokenData);

    } catch (error) {
      console.error("Error minting tokens:", error);
    }
  }

  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const [hasUpdated, setHasUpdated] = useState(false);

  useEffect(() => {
    if (isConfirmed && !hasUpdated) {
      updateTokenInfo(tokenData);
      setHasUpdated(true);
    }
  }, [isConfirmed, hasUpdated, tokenData]);

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


export function RedeemTokensButton({ tokenData }: { tokenData: [any, React.Dispatch<React.SetStateAction<{ [key: string]: number }>>] }) {
  const { data: hash, writeContract } = useWriteContract();
  const addRecentTransaction = useAddRecentTransaction();
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

      // Reset input fields
      setTokenName("");
      setAmount("");



      // Add transaction to recent transactions
      if (hash) {
        console.log("hash: ", hash);
        addRecentTransaction({
          hash: hash,
          description: `Redeemed token for ${tokenName}, amount: ${amount}`,
          confirmations: 2,
        });
      }
      updateTokenInfo(tokenData);
    } catch (error) {
      console.error("Error redeeming tokens:", error);
    }
  }

  const {isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const [hasUpdated, setHasUpdated] = useState(false);

  useEffect(() => {
    if (isConfirmed && !hasUpdated) {
      updateTokenInfo(tokenData);
      setHasUpdated(true);
    }
  }, [isConfirmed, hasUpdated, tokenData]);

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

export async function updateTokenInfo(tokenData: [{ [key: string]: number }, React.Dispatch<React.SetStateAction<{ [key: string]: number }>>]) {
  const [, setTokenData] = tokenData;
  const CONTRACT_ADDRESS = "0x31717fD782f9070d6bCFdA3d73102013E0A30354";

  async function readTokens(token: string): Promise<number> {
    try {
      const count = await readContract(wagmiConfig, {
        abi: abi,
        address: CONTRACT_ADDRESS,
        functionName: "getTokenBalance",
        args: [token],
      });
      console.log("heres the balance for token", token, count);
      return count as number;
    } catch (error) {
      console.error(`Error reading token ${token}:`, error);
      return 0;
    }
  }

  async function readTokenNames(): Promise<string[]> {
    try {
      console.log("read token names function just called");
      const tokenData = await readContract(wagmiConfig, {
        abi: abi,
        address: CONTRACT_ADDRESS,
        functionName: "getTokenNames",
      });
      console.log("heres the names", tokenData);
      return tokenData as string[];
    } catch (error) {
      console.error(`Error reading token names`, error);
      return [];
    }
  }

  try {
    const tokenNames = await readTokenNames();

    const tokenDetails = await Promise.all(
      tokenNames.map(async (token) => {
        const count = await readTokens(token);
        return { [token]: count };
      })
    );

    // Merge all token details into a single object
    const updatedTokenData = tokenDetails.reduce((acc, tokenDetail) => {
      return { ...acc, ...tokenDetail };
    }, {});

    setTokenData(updatedTokenData as { [key: string]: number });
    console.log("updated token data", updatedTokenData);
  } catch (error) {
    console.error("Error fetching token data:", error);
  }
}
