import { AnchorProvider, Program, Wallet } from '@project-serum/anchor';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';

import { readAllFromRPC } from '@staratlas/data-source';
import { PLAYER_PROFILE_IDL, PlayerProfile  } from '@staratlas/player-profile';

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

// wallet address of the player
const playerId = new PublicKey('2yodqKtkdNJXxJv21s5YMVG8bjscaezLVFRfnWra5D77');

// get the first profile from the player profile program 
const [accountInfo] = await connection.getProgramAccounts(
    new PublicKey('pprofELXjL5Kck7Jn5hCpwAL82DpTkSYBENzahVtbc9'),
    {
        filters: [
            {
                memcmp: {
                    offset: 30, // PlayerProfile.MIN_DATA_SIZE + 2
                    bytes: playerId.toBase58(),
                },
            },
        ],
    },
);

console.log(accountInfo); // 8bAzn7Dcv4msX8wMcoaxjm5TvmDr9AKqN3QhQxGxSTjS

const playerProfileProgram = new Program(
    PLAYER_PROFILE_IDL,
    new PublicKey('pprofELXjL5Kck7Jn5hCpwAL82DpTkSYBENzahVtbc9'),
    provider,
);

const profiles = await readAllFromRPC(
    connection,
    playerProfileProgram,
    PlayerProfile,
    'processed',
    [
        {
            memcmp: {
                offset: PlayerProfile.MIN_DATA_SIZE + 2,
                bytes: playerId.toBase58(),
            },
        },
    ],
);

console.log('profiles found', profiles.length); // 1
console.log(profiles[0].key.toBase58()); // 8bAzn7Dcv4msX8wMcoaxjm5TvmDr9AKqN3QhQxGxSTjS