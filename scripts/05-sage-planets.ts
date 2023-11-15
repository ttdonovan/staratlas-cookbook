import { AnchorProvider, Program, Wallet } from '@project-serum/anchor';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';

import { SAGE_IDL } from '@staratlas/sage';

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

const planetName = 'ONI-2-4'; // AsteroidBelt (F3cyHZYLmZZMTi1zJMpGigj3ictSTV4UCg8M2X2ur9wJ)
const planetNameBs58 = bs58.encode(Buffer.from(planetName));
console.log(planetNameBs58); // 41JwqJ7euy

const [planet] = await sageProgram.account.planet.all([
    {
        memcmp: {
            offset: 9, // 8 (discriminator) + 1 (version)
            bytes: planetNameBs58, // name
        },
    },
]);

console.log(planet);
console.log(planet.publicKey.toBase58()); // F3cyHZYLmZZMTi1zJMpGigj3ictSTV4UCg8M2X2ur9wJ