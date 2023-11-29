# NOTES

* https://github.com/solana-playground/solana-playground
* https://github.com/rust-lang/rust-playground
* https://blog.anishde.dev/creating-a-custom-solana-connect-wallet-ui-with-react-and-chakra-ui

* https://bun.sh/guides/ecosystem/vite

## Setup

```bash
bun create vite playground
mv playground frontend

cd frontend
bun install
```

### Solana Wallet Adapter

```bash
bun install @solana/web3.js @solana/wallet-adapter-base @solana/wallet-adapter-react @solana/wallet-adapter-wallets
```

### Chakra UI

```bash
bun install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```