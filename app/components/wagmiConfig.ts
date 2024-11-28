import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: '60bd7b0cefb2f04a9a5fe020f741a96a',
  chains: [base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});