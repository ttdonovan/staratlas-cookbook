import { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider, useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

const WebWallet: FC = () => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint.
    //const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const endpoint = 'https://solana-api.syndica.io/access-token/WPoEqWQ2auQQY1zHRNGJyRBkvfOLqw58FqYucdYtmy8q9Z84MBWwqtfVf8jKhcFh/rpc';

    const wallets = useMemo(
        () => [
            /**
             * Wallets that implement either of these standards will be available automatically.
             *
             *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
             *     (https://github.com/solana-mobile/mobile-wallet-adapter)
             *   - Solana Wallet Standard
             *     (https://github.com/solana-labs/wallet-standard)
             *
             * If you wish to support a wallet that supports neither of those standards,
             * instantiate its legacy wallet adapter here. Common legacy adapters can be found
             * in the npm package `@solana/wallet-adapter-wallets`.
             */
            new UnsafeBurnerWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                    {/* <SendSOLToRandomAddress /> */}
                    {/* <App /> */}
                    <PlayGame />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

// const SendSOLToRandomAddress: FC = () => {
//     const { connection } = useConnection();
//     const { publicKey, sendTransaction } = useWallet();

//     const onClick = useCallback(async () => {
//         if (!publicKey) throw new WalletNotConnectedError();

//         // 890880 lamports as of 2022-09-01
//         const lamports = await connection.getMinimumBalanceForRentExemption(0);

//         const transaction = new Transaction().add(
//             SystemProgram.transfer({
//                 fromPubkey: publicKey,
//                 toPubkey: Keypair.generate().publicKey,
//                 lamports,
//             })
//         );

//         const {
//             context: { slot: minContextSlot },
//             value: { blockhash, lastValidBlockHeight }
//         } = await connection.getLatestBlockhashAndContext();

//         console.log({ minContextSlot, blockhash, lastValidBlockHeight, transaction });

//         // const signature = await sendTransaction(transaction, connection, { minContextSlot });
//         // await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
//     }, [publicKey, sendTransaction, connection]);

//     return (
//         <button onClick={onClick} disabled={!publicKey}>
//             Send SOL to a random address!
//         </button>
//     );
// }

import { AnchorProvider, Program } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

import { readAllFromRPC } from '@staratlas/data-source';
import { SAGE_IDL, Fleet } from '@staratlas/sage';

import init, { run_bevy_app } from '../rust-wasm-lib/pkg/rust_wasm_lib.js';

const PlayGame: FC = () => {
    const wallet = useAnchorWallet();
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    const runBevyApp = async () => {
      if (!publicKey || !wallet) throw new WalletNotConnectedError();

      const provider = new AnchorProvider(
        connection,
        wallet,
        AnchorProvider.defaultOptions(),
      );

      const sageProgram = new Program(
        SAGE_IDL,
        new PublicKey('SAGEqqFewepDHH6hMDcmWy7yjHPpyKLDnRXKb3Ki8e6'),
        provider,
      );

      // get the first profile from the player profile program 
      const [accountInfo] = await connection.getProgramAccounts(
        new PublicKey('pprofELXjL5Kck7Jn5hCpwAL82DpTkSYBENzahVtbc9'),
        {
          filters: [
            {
              memcmp: {
                offset: 30, // PlayerProfile.MIN_DATA_SIZE + 2
                bytes: publicKey.toBase58(),
              },
            },
          ],
        },
      );

      // get all fleet for player profile
      const fleets = await readAllFromRPC(
        connection,
        sageProgram,
        Fleet,
        'processed',
        [
          {
            memcmp: {
              offset: 41, // 8 (discriminator) + 1 (version) + 32 (gameId)
              bytes: accountInfo.pubkey.toBase58(), // ownerProfile
            },
          },
        ],
      );

      console.log(JSON.stringify(fleets));

      console.log("before: run_bevy_app()");
      await init('../rust-wasm-lib/pkg/rust_wasm_lib_bg.wasm');
      run_bevy_app(JSON.stringify(fleets));
      console.log("after: run_bevy_app()");
    }

    return (
      <button onClick={runBevyApp} disabled={!publicKey}>
        Let's Play!
      </button>
    );
}

export default WebWallet;