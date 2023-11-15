# Profile

See [Example's Setup](../intro.html#examples-setup) for context.

* https://build.staratlas.com/dev-resources/mainnet-program-ids
* https://build.staratlas.com/dev-resources/apis-and-data/player-profile

Solscan.io links:

* [Wallet](https://solscan.io/account/2yodqKtkdNJXxJv21s5YMVG8bjscaezLVFRfnWra5D77)
* [Profile](https://solscan.io/account/8bAzn7Dcv4msX8wMcoaxjm5TvmDr9AKqN3QhQxGxSTjS)

## Get Program Accounts (first) From Connection

```typescript
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
```

## Get PlayerProfiles from Program

```typescript
import { readAllFromRPC } from '@staratlas/data-source';
import { PLAYER_PROFILE_IDL, PlayerProfile  } from '@staratlas/player-profile';

const playerProfileProgram = new Program(
    PLAYER_PROFILE_IDL,
    new PublicKey('pprofELXjL5Kck7Jn5hCpwAL82DpTkSYBENzahVtbc9'),
    provider,
);

// the Star Atlas player (wallet address)
const playerId = new PublicKey('2yodqKtkdNJXxJv21s5YMVG8bjscaezLVFRfnWra5D77');

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
```