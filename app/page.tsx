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
import { TokenCard } from "@/components/tokenCard"; 

function Page() {




  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 12,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
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
      </div>

      <TokenCard />

      <div className="ml-auto">
        <ConnectButton />
      </div>
    </div>
  );
}

export default Page;
