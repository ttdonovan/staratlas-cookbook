import { AnchorProvider, Program, Wallet } from '@project-serum/anchor';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';

import { byteArrayToString, readAllFromRPC } from '@staratlas/data-source';
import { SAGE_IDL, Fleet } from '@staratlas/sage';

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

// found from 01-profiles.ts
const playerProfileId = new PublicKey('8bAzn7Dcv4msX8wMcoaxjm5TvmDr9AKqN3QhQxGxSTjS');

const fleets = await readAllFromRPC(
    connection,
    sageProgram,
    Fleet,
    'processed',
    [
        {
            memcmp: {
                offset: 41, // 8 (discriminator) + 1 (version) + 32 (gameId)
                bytes: playerProfileId.toBase58(), // ownerProfile
            },
        },
    ],
);

console.log('fleets found:', fleets.length); // 1

const [fleet] = fleets;
if (fleet.type == 'ok') {
    const account = fleet.data as Fleet;

    console.log(account.key.toBase58()); // 771Sgp2yb1h3XsCrQjFLRq5L74ZX6qD8wzbZmjGeMxtF (as of 2023-11-14)
    console.log(byteArrayToString(account.data.fleetLabel)); // Hyena Fleet (as of 2023-11-14)
    console.log(JSON.stringify(account.state)); // {"Idle":{"sector":["-28","1e"]}}
}
