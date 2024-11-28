'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

export function AddNewTokenButton() {
  const handleAddNewToken = () => {
    console.log("Add New Token button clicked");
    // Add your logic here, e.g., call an API
    
  };

  return <Button onClick={handleAddNewToken}>Add New Token</Button>;
}

export function MintTokensButton() {
  const handleMintTokens = () => {
    console.log("Mint Tokens button clicked");
    // Add your logic here, e.g., call an API
  };

    return <Button onClick={handleMintTokens}>Mint Tokens</Button>;
}

export function RedeemTokensButton() {
  const handleRedeemTokens = () => {
    console.log("Redeem Tokens button clicked");
    // Add your logic here, e.g., call an API
  };

  return <Button onClick={handleRedeemTokens}>Redeem Tokens</Button>;
}
