// import type { BunPlugin } from 'bun';

// const myPlugin: BunPlugin = {
//   name: 'my-plugin',
//   setup(_build) {
//     new ProvidePlugin({
//         Buffer: ['buffer', 'Buffer'],
//     });
//   },
// };

const result = await Bun.build({
    entrypoints: ['index.ts'],
    outdir: 'dist',
    target: 'browser',
});

console.log(result);