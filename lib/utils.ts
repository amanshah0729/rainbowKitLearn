import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { readContract } from "wagmi/actions";
import { wagmiConfig } from "@/components/wallet-providers";
import { abi } from "@/app/abi";

// Utility for combining class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Token-related utilities
const CONTRACT_ADDRESS = '0x31717fD782f9070d6bCFdA3d73102013E0A30354';

export async function readTokenNames(): Promise<string[]> {
  try {
    const tokenData = await readContract(wagmiConfig, {
      abi: abi,
      address: CONTRACT_ADDRESS,
      functionName: 'getTokenNames',
    });
    return tokenData as string[];
  } catch (error) {
    console.error('Error reading token names:', error);
    return [];
  }
}

export async function readTokens(token: string): Promise<any> {
  try {
    const count = await readContract(wagmiConfig, {
      abi: abi,
      address: CONTRACT_ADDRESS,
      functionName: 'getTokenBalance',
      args: [token],
    });
    return count;
  } catch (error) {
    console.error(`Error reading token ${token}:`, error);
    return null;
  }
}

export async function updateTokenCounts(): Promise<{ token: string; count: any }[]> {
  console.log("updating token counts");
  try {
    const tokenNames = await readTokenNames();

    const tokenDetails = await Promise.all(
      tokenNames.map(async (token) => {
        const count = await readTokens(token);
        return { token, count };
      })
    );

    return tokenDetails;
  } catch (error) {
    console.error('Error updating token counts:', error);
    return [];
  }
}

