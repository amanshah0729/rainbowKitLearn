'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useAccount } from "wagmi";
import { useState } from "react";

export const TokenCard = ({ tokenData = {} }) => {
  const { isConnected } = useAccount();

  return (
    <Card className="ml-10 mt-10">
      <CardHeader>
        <CardTitle>Token List</CardTitle>
        <CardDescription>
          {Object.keys(tokenData).length > 0 ? (
            <ul>
              {Object.entries(tokenData).map(([token, count]) => (
                <li key={token}>
                  {token}: {count != null ? count.toString() : "Error fetching data"}
                </li>
              ))}
            </ul>
          ) : (
            "No token data available."
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
  