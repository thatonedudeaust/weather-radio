import { mkdir, copyFile, writeFile, readFile } from 'fs/promises';
import { existsSync, readdirSync } from 'fs';
import path from 'path';

// Debug — show what's in node_modules/@echogarden/dectalk-wasm
const dtBase = 'node_modules/@echogarden/dectalk-wasm';

console.log('Checking if package exists:', existsSync(dtBase));

if (existsSync(dtBase)) {
  console.log('Root contents:', readdirSync(dtBase));
  if (existsSync(path.join(dtBase, 'lib'))) {
    console.log('lib contents:', readdirSync(path.join(dtBase, 'lib')));
  } else {
    console.log('No lib folder found');
  }
  if (existsSync(path.join(dtBase, 'wasm'))) {
    console.log('wasm contents:', readdirSync(path.join(dtBase, 'wasm')));
  } else {
    console.log('No wasm folder found');
  }
} else {
  console.log('Package not found at all!');
}

// Create dist folder
await mkdir('dist', { recursive: true });

// Copy index.html into dist as a sanity check
await copyFile('index.html', 'dist/index.html');
console.log('Copied index.html → dist/index.html');

console.log('Build complete!');
