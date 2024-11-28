import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  base
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'rainbow-hw',
  projectId: '60bd7b0cefb2f04a9a5fe020f741a96a',
  chains: [
    base
  ],
  ssr: true,
});
