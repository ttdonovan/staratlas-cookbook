# Introduction

A collection of simple SAGE examples that demonstrate how to accomplish common program tasks,
using TypeScript and bindings from [Star Atlas Build](https://build.staratlas.com/).

## Example's Setup

Most if not all examples will follow this setup:

```typescript
{{#include ../scripts/00-setup.ts}}
```

The wallet address used in examples [2yodqKtkdNJXxJv21s5YMVG8bjscaezLVFRfnWra5D77](https://solscan.io/account/2yodqKtkdNJXxJv21s5YMVG8bjscaezLVFRfnWra5D77).

## Full Source Code Examples

Full source code examples can be found under `/scripts`.

Example of usage:

```
# make changes to `.env` file
$ cp .env.example .env

$ bun install
$ bun run scripts/01-player-profiles.ts
```