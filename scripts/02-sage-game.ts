import { AnchorProvider, Program, Wallet } from '@project-serum/anchor';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';

import { readAllFromRPC } from '@staratlas/data-source';
import { SAGE_IDL, Game } from '@staratlas/sage';

const rpc_url = Bun.env.SOLANA_RPC_URL || 'http://localhost:8899';
const connection = new Connection(rpc_url, 'confirmed');

const payer = Keypair.generate();

// const payer = Keypair.fromSecretKey(
//   bs58.decode(Bun.env.SOLANA_PAYER_SECRET_KEY as string)
// );

const provider = new AnchorProvider(
    connection,
    new Wallet(payer),
    AnchorProvider.defaultOptions(),
);

const sageProgram = new Program(
    SAGE_IDL,
    new PublicKey('SAGEqqFewepDHH6hMDcmWy7yjHPpyKLDnRXKb3Ki8e6'),
    provider,
);

// TODO: check with team to determine which method of getting an account is perfereable
// const games = await readAllFromRPC(
//     connection,
//     sageProgram,
//     Game,
//     'processed',
//     [],
// );

// TODO: re-think how to explain this in the recipes
// TODO: need to confirm with the team that there will only ever be one game
//   > There will be another game when for example Starbased comes out with another gameID.
//   > So for now there is only one, but that will change in the future.
//   > as of today (2023-11-14) there is only one game, but could be mutiverse in the future
const [game] = await sageProgram.account.game.all();

console.log(game);
console.log(game.publicKey.toBase58()); // GameYNgVLn9kd8BQcbHm8jNMqJHWhcZ1YTNy6Pn3FXo5