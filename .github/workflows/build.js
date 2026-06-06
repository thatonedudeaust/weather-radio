import { mkdir, copyFile, writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Create dist folder
await mkdir('dist', { recursive: true });

// Copy the dectalk wasm and js files from node_modules
const dtBase = 'node_modules/@echogarden/dectalk-wasm';

const filesToCopy = [
  'lib/dectalk.js',
  'lib/dectalk.wasm',
];

for (const f of filesToCopy) {
  const src = path.join(dtBase, f);
  const dest = path.join('dist', path.basename(f));
  if (existsSync(src)) {
    await copyFile(src, dest);
    console.log(`Copied: ${f} → dist/${path.basename(f)}`);
  } else {
    console.warn(`Not found: ${src}`);
  }
}

// Copy index.html into dist
await copyFile('index.html', 'dist/index.html');
console.log('Copied index.html → dist/index.html');

console.log('Build complete!');
