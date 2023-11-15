# Fleets

See [Example's Setup](../intro.html#examples-setup) for context.

* https://build.staratlas.com/dev-resources/mainnet-program-ids
* https://build.staratlas.com/dev-resources/apis-and-data/sage

Solscan.io links:

* [PlayerProfile](https://solscan.io/account/8bAzn7Dcv4msX8wMcoaxjm5TvmDr9AKqN3QhQxGxSTjS)
* [Fleet](https://solscan.io/account/771Sgp2yb1h3XsCrQjFLRq5L74ZX6qD8wzbZmjGeMxtF)

## Get Player Profile Fleets from Program

```typescript
import { readAllFromRPC } from '@staratlas/data-source';
import { SAGE_IDL, Fleet } from '@staratlas/sage';

const sageProgram = new Program(
    SAGE_IDL,
    new PublicKey('SAGEqqFewepDHH6hMDcmWy7yjHPpyKLDnRXKb3Ki8e6'),
    provider,
);

// found from 01-player-profiles.ts
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
```

## Get Idle Fleets at Sector from Program

```typescript
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
```