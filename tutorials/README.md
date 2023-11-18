# Tutorials _WIP_

A _wip_ collection of tutorials, web wallets and wasm...

## 00-basic

* https://macroquad.rs/
* https://github.com/not-fl3/macroquad
* https://github.com/solana-labs/wallet-adapter

```
# build wasm
cargo build --target wasm32-unknown-unknown

mkdir target
cp ../../target/wasm32-unknown-unknown/debug/sa-cookbook-basic.wasm dist/.

# bun init .
bun build index.ts --outfile=dist/bundle.js

# cargo install basic-http-server
basic-http-server .
```

## 00-wallet

* https://bun.sh/guides/ecosystem/vite
* https://github.com/solana-labs/wallet-adapter/blob/master/APP.md
* https://nextjs.org/learn/react-foundations

```
bun install
bun run dev
```

## 00-wasm-bevy

* https://bevyengine.org/
* https://bevyengine.org/learn/book/introduction/
* https://bevy-cheatbook.github.io/platforms/wasm.html
* https://trunkrs.dev

```
# cargo install trunk
# cargo install wasm-bindgen-cli
cd 00-wasm-bevy
trunk build
trunk serve
```

## 01-sage-rust-wasm

### WIP: how to wrap a wam game behind a web wallet?

* https://bevyengine.org/examples/
* https://github.com/nshen/vite-plugin-wasm-pack/tree/main
* https://guptanikhil.medium.com/rust-wasm-breakout-game-i-1b474e41a132