/**
 *  Require esbuild globally installed
 * 
 *  dev build: node build --watch
 *  prd build: node build
 * 
 */

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
  runCommand('cp src/index.html public/index.html');
  runCommand('cp -r src/styles public/styles');
  runCommand('cp -r src/sounds public/sounds');
  runCommand('cp -r src/images public/images');



runCommand(`esbuild src/scripts/main.js --bundle ${watch=='--watch'?'--watch':''} --outfile=public/bundle.js ${watch=='--watch'?'':'--minify'} --target=es6 --loader:.html=text --loader:.css=text --sourcemap`);

}

build(process.argv[2]);