"use client";
import { useAccount } from 'wagmi';
const { isConnected } = useAccount();

// Export a function to check if the user is logged in
export function isUserLoggedIn(): boolean {
    return isConnected;
}
