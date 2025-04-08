#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const mainScript = resolve(__dirname, '../dist/index.js');

try {
  execSync(`node ${mainScript} ${process.argv.slice(2).join(' ')}`, {
    stdio: 'inherit'
  });
} catch (error) {
  console.error('Error executing deep-directory-tree:', error.message);
  process.exit(1);
} 