# Game

See [Example's Setup](../intro.html#examples-setup) for context.

* https://build.staratlas.com/dev-resources/mainnet-program-ids
* https://build.staratlas.com/dev-resources/apis-and-data/sage

Solscan.io links:

* [Game](https://solscan.io/account/GameYNgVLn9kd8BQcbHm8jNMqJHWhcZ1YTNy6Pn3FXo5)

## Get Game from Program

```typescript
const sageProgram = new Program(
    SAGE_IDL,
    new PublicKey('SAGEqqFewepDHH6hMDcmWy7yjHPpyKLDnRXKb3Ki8e6'),
    provider,
);

// as of today (2023-11-14) there is only one game
const [game] = await sageProgram.account.game.all();

console.log(game);
console.log(game.publicKey.toBase58()); // GameYNgVLn9kd8BQcbHm8jNMqJHWhcZ1YTNy6Pn3FXo5
```