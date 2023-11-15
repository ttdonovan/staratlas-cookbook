import { AnchorProvider, BN, Program, Wallet } from '@project-serum/anchor';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';

import { readAllFromRPC } from '@staratlas/data-source';
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

const sector = [new BN(40), new BN(30)]; // Ustur Central Space Station
console.log(sector); // ["28","1e"]

const xBN = sector[0];
const xArr = xBN.toTwos(64).toArrayLike(Buffer, 'le', 8);
const x58 = bs58.encode(xArr);

console.log(xArr); // [ 40, 0, 0, 0, 0, 0, 0, 0 ]
console.log(x58); // 7h3uZHkjKhh

const yBN = sector[1];
const yArr = yBN.toTwos(64).toArrayLike(Buffer, 'le', 8);
const y58 = bs58.encode(yArr);

console.log(yArr); // [ 30, 0, 0, 0, 0, 0, 0, 0 ]
console.log(y58); // 623BRDZoF2X

const fleets = await readAllFromRPC(
    connection,
    sageProgram,
    Fleet,
    'processed',
    [
        {
            memcmp: {
                offset: 415, // Fleet's state Idle at sector offset for X
                bytes: x58,
            },
        },
        {
            memcmp: {
                offset: 423, // Fleet's state Idle at sector offset for Y
                bytes: y58,
            },
        },
    ],
);

console.log(`fleets found: ${fleets.length}`);