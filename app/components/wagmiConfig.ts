import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, sepolia } from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: '',
  chains: [sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});