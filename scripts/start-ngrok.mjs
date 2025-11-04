import { spawn } from 'child_process';

const domain = 'musical-stag-luckily.ngrok-free.app';
const port = 3000;

console.log(`Starting ngrok tunnel on port ${port}...`);

const ngrokProcess = spawn('ngrok', ['http', `--domain=${domain}`, port.toString()], {
  stdio: 'inherit',
  shell: true
});

ngrokProcess.on('error', (error) => {
  console.error('Error starting ngrok:', error.message);
  console.error('Make sure ngrok is installed and in your PATH');
  process.exit(1);
});

ngrokProcess.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`ngrok exited with code ${code}`);
    process.exit(code);
  }
});

process.on('SIGINT', () => {
  console.log('\nClosing ngrok tunnel...');
  ngrokProcess.kill('SIGINT');
  process.exit(0);
});
