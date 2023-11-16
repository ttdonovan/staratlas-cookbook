# Tips

## DecodedAccountData !== ProgramAccount

When reading data from RPC prioritize functions `readAllFromRPC` and `readFromRPC`
from `@staratlas/data-source` over `program.accounts.*`.

```typescript
import { readAllFromRPC, readFromRPC } from '@staratlas/data-source';
import { SAGE_IDL, Fleet } from '@staratlas/sage';

const sageProgram = new Program(
    SAGE_IDL,
    new PublicKey('SAGEqqFewepDHH6hMDcmWy7yjHPpyKLDnRXKb3Ki8e6'),
    provider,
);

// better option for decoding account data
const [fleet] = await readAllFromRPC(
    connection,
    sageProgram,
    Fleet,
    'processed',
    [
        {
            memcmp: {
                offset: 41,
                bytes: playerProfileId.toBase58(),
            },
        },
    ],
);

// not ideal because ignores the 'remaining data' which might include state information
const [fleetAccount] = await sageProgram.account.fleet.all([
    {
        memcmp: {
            offset: 41,
            bytes: playerProfileId.toBase58(),
        },
    },
]);

// fleet !== fleetAccount
```