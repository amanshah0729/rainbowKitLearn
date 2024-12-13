"use client";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AddNewTokenButton, MintTokensButton, RedeemTokensButton } from "@/components/ButtonActions";
import { TokenCard } from "@/components/tokenCard"; 
import React from "react";
import { updateTokenInfo } from '@/components/ButtonActions';


//export const ThemeContext = React.createContext({});

function Page() {
  const [tokenAmounts, setTokenAmounts] = React.useState<{ [key: string]: number }>({});

  React.useEffect(() => {
    const fetchData = async () => {
      await updateTokenInfo([tokenAmounts, setTokenAmounts]);
    };
    fetchData();
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 12,
      }}
    >
      <div className="ml-auto">
        <ConnectButton />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Card className="ml-10">
          <CardHeader>
            <CardTitle>Add New Token</CardTitle>
            <CardDescription>Create a new token for a new celebrity</CardDescription>
          </CardHeader>
          <CardContent>
            <AddNewTokenButton tokenData={[tokenAmounts, setTokenAmounts]} />
          </CardContent>
        </Card>

        <Card className="ml-10">
          <CardHeader>
            <CardTitle>Mint More Tokens</CardTitle>
            <CardDescription>Mint additional tokens for existing celebrities</CardDescription>
          </CardHeader>
          <CardContent>
            <MintTokensButton tokenData={[tokenAmounts, setTokenAmounts]} />
          </CardContent>
        </Card>

        <Card className="ml-10">
          <CardHeader>
            <CardTitle>Redeem Tokens</CardTitle>
            <CardDescription>Redeem your tokens for rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <RedeemTokensButton tokenData={[tokenAmounts, setTokenAmounts]} />
          </CardContent>
        </Card>
      </div>

      <TokenCard tokenData={tokenAmounts} />

    </div>
  );
}

export default Page;
