import { useMemo } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

import Home from './Home';
import Wallets from './components/Wallets';

const theme = extendTheme({
    config: {
        initialColorMode: "dark",
    },
});

const AppLazy = () => {
    const endpoint = useMemo(() => clusterApiUrl('devnet'), []);

    const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);

    return(
        <ConnectionProvider endpoint={endpoint}>
            <ChakraProvider theme={theme}>
                <WalletProvider wallets={wallets} autoConnect>
                    <Home />
                    <Wallets />
                </WalletProvider>
            </ChakraProvider>
        </ConnectionProvider>
    );
};

export default AppLazy;