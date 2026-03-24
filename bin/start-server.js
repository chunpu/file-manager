#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const path = require('path');
const { spawn } = require('child_process');
const { program } = require('commander');

program
  .name('web-file-manager')
  .description('A web-based file manager')
  .version('0.1.0')
  .option('-p, --port <number>', 'Port to run the server on', '3000')
  .argument('[path]', 'Directory to manage', process.cwd())
  .action((targetPath, options) => {
    const absolutePath = path.resolve(targetPath);
    const port = options.port;

    console.log(`🚀 Starting File Manager for directory: ${absolutePath}`);
    console.log(`📂 Root: ${absolutePath}`);
    console.log(`🌐 Server will be available at: http://localhost:${port}\n`);

    const env = {
      ...process.env,
      FILE_MANAGER_ROOT: absolutePath,
      NEXT_TELEMETRY_DISABLED: '1',
    };

    const nextDev = spawn('npx', ['next', 'dev', '-p', port], {
      env,
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });

    nextDev.on('error', err => {
      console.error('❌ Failed to start File Manager:', err);
      process.exit(1);
    });

    nextDev.on('close', code => {
      process.exit(code || 0);
    });
  });

program.parse();
