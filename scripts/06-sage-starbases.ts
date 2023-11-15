import { AnchorProvider, BN, Program, Wallet } from '@project-serum/anchor';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';

import { byteArrayToString, readFromRPCOrError, stringToByteArray } from '@staratlas/data-source';
import { SAGE_IDL, Starbase } from '@staratlas/sage';

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

// from 02-sage-game.ts
const gameId = new PublicKey('GameYNgVLn9kd8BQcbHm8jNMqJHWhcZ1YTNy6Pn3FXo5');

const sector = [new BN(-40), new BN(30)]; // Oni CSS (6dQxXQz6zmmFHXbxVvSmZBGWCzehD3HyMXSiXKydBZBk)

const [starbaseAddress] = Starbase.findAddress(
    sageProgram,
    gameId,
    sector as [BN, BN]
);

console.log(starbaseAddress.toBase58()); // 6dQxXQz6zmmFHXbxVvSmZBGWCzehD3HyMXSiXKydBZBk

// option 1 - read from RPC given found address
const starbase01 = await readFromRPCOrError(
    provider.connection,
    sageProgram,
    starbaseAddress,
    Starbase,
    'confirmed'
);

console.log(starbase01);
console.log(byteArrayToString(starbase01.data.name)); // ONI Central Space Station

// option 2 - read from program offset to sector
const xBN = sector[0];
const xArr = xBN.toTwos(64).toArrayLike(Buffer, 'le', 8);
const x58 = bs58.encode(xArr);

const yBN = sector[1];
const yArr = yBN.toTwos(64).toArrayLike(Buffer, 'le', 8);
const y58 = bs58.encode(yArr);

const [starbase02] = await sageProgram.account.starbase.all([
    {
        memcmp: {
            offset: 41, // 8 (discriminator) + 1 (version) + 32 (gameId)
            bytes: x58, // sector X
        }
    },
    {
        memcmp: {
            offset: 49, // 8 (discriminator) + 1 (version) + 32 (gameId) + 8 (sector X)
            bytes: y58, // sector Y
        }
    },
]);

console.log(starbase02.publicKey.toBase58()); // 6dQxXQz6zmmFHXbxVvSmZBGWCzehD3HyMXSiXKydBZBk

// option 3 - read from program offset to name
const name = stringToByteArray('ONI Central Space Station');
const name58 = bs58.encode(name);
console.log(name58); // Yuqb6RkSNGv9DAizaf2ZtW5D4mZFpwcy4h

const [starbase03] = await sageProgram.account.starbase.all([
    {
        memcmp: {
            offset: 89, // 8 (discriminator) + 1 (version) + 32 (gameId) + 16 (sector) + 32 (carftingFacility)
            bytes: name58, // name
        }
    },
]);

console.log(starbase03.publicKey.toBase58()); // 6dQxXQz6zmmFHXbxVvSmZBGWCzehD3HyMXSiXKydBZBk