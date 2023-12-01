const { execSync } = require('child_process');
const fs = require('fs/promises');

function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    process.exit(1);
  }
}

async function build(watch) {
  runCommand('rm -rf public && mkdir public');

  runCommand('cp index.html public/index.html');
  runCommand('cp -r styles public/styles');
  runCommand('cp -r sounds public/sounds');
  runCommand('cp -r images public/images');

console.log(watch)
runCommand(`esbuild scripts/main.js --bundle ${watch=='--watch'?'--watch':''} --outfile=public/bundle.js --target=es6 --loader:.html=text --loader:.css=text --sourcemap`);
}

build(process.argv[2]);