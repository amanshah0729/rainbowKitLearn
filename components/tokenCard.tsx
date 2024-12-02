'use client';
    
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
  } from "@/components/ui/card";
  import { useAccount, useWriteContract, useReadContract } from "wagmi";
  import { abi } from "@/app/abi";
  import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
  import { wagmiConfig } from "@/components/wallet-providers";
  import { readContract } from "wagmi/actions";
  import { useState, useEffect } from "react";
  
  export const TokenCard = () => {
    const tokenList = ["helloToken", "nameToken"];
    const { isConnected } = useAccount();
    const tokensList: { [key: string]: any } = {}; // Stores token data
    const [tokenData, setTokenData] = useState<{ token: string; count: any }[]>(
      []
    );
    const CONTRACT_ADDRESS = "0x31717fD782f9070d6bCFdA3d73102013E0A30354";
  
    async function readTokens(token: string) {
      try {
        const count = await readContract(wagmiConfig, {
          abi: abi,
          address: CONTRACT_ADDRESS,
          functionName: "getTokenBalance",
          args: [token],
        });
        console.log("heres the balance", count );
        return count;
      } catch (error) {
        console.error(`Error reading token ${token}:`, error);
        return null;
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
  
    useEffect(() => {
      const fetchTokenData = async () => {
        try {
          const tokenNames = await readTokenNames();

          const tokenDetails = await Promise.all(
            tokenNames.map(async (token) => {
              const count = await readTokens(token);
              return { token, count };
            })
          );

          setTokenData(tokenDetails);
        } catch (error) {
          console.error("Error fetching token data:", error);
        }
      };
  
      fetchTokenData();
    }, []);
  
    return (
      <Card className="ml-10 mt-10">
        <CardHeader>
          <CardTitle>Token List</CardTitle>
          <CardDescription>
            {tokenData.length > 0 ? (
              <ul>
                {tokenData.map(({ token, count }) => (
                  <li key={token}>
                    {token}: {count !== null ? count : "Error fetching data"}
                  </li>
                ))}
              </ul>
            ) : (
              "Loading token data..."
            )}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  };
  