#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');

const targetPath = process.argv[2] || process.cwd();
const absolutePath = path.resolve(targetPath);

console.log(`🚀 Starting File Manager for directory: ${absolutePath}`);
console.log(`📂 Root: ${absolutePath}`);
console.log(`🌐 Server will be available at: http://localhost:3000\n`);

const env = {
  ...process.env,
  FILE_MANAGER_ROOT: absolutePath,
  NEXT_TELEMETRY_DISABLED: '1'
};

const nextDev = spawn('npx', ['next', 'dev'], {
  env,
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
  shell: process.platform === 'win32'
});

nextDev.on('error', (err) => {
  console.error('❌ Failed to start File Manager:', err);
  process.exit(1);
});

nextDev.on('close', (code) => {
  process.exit(code || 0);
});
