// import { Connection } from '@solana/web3.js';

const Wallet = () => {
    const rpcUrl = 'https://solana-api.syndica.io/access-token/WPoEqWQ2auQQY1zHRNGJyRBkvfOLqw58FqYucdYtmy8q9Z84MBWwqtfVf8jKhcFh/rpc';
    // const connection = new Connection(rpc_url, 'confirmed');

    return {
        rpcUrl
    };
}

console.log("Hello via Bun!");

window.Wallet = Wallet;