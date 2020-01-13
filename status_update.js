const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

const STATUS_UPDATE_DIR = path.join(
  require('os').homedir(),
  '.statusupdate',
);

const files = fs.readdirSync(STATUS_UPDATE_DIR, { encoding: 'utf8' });

if (files.length === 0) {
  console.log('No status update');
  return;
}

const recentlyModified = files.map(f => path.join(STATUS_UPDATE_DIR, f)).sort((a, b) => {
  return fs.statSync(b).mtime - fs.statSync(a).mtime;
})[0];

console.log(fs.readFileSync(recentlyModified).toString());
