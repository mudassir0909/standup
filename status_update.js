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
const baseName = path.basename(recentlyModified);

let dd;
let mm;
let yyyy;
try {
  [dd, mm, yyyy] = validateFilename(baseName)
} catch {
  console.log('Invalid status update file found');
  process.exit(1);
}
logStatusUpdate(fs.readFileSync(recentlyModified).toString(), { dd, mm, yyyy });

function validateFilename(fileName) {
  if (fileName.length !== "ddmmyyyy".length) {
    throw new Error();
  }
  const [dd, mm, yyyy] = [
    fileName.slice(0, 2),
    fileName.slice(2, 4),
    fileName.slice(4, 8),
  ].map(x => parseInt(x, 10));

  if ([dd, mm, yyyy].some(s => isNaN(s))) {
    throw new Error();
  }

  return [dd, mm, yyyy];
}

function logStatusUpdate(update, { dd, mm, yyyy }) {
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][mm];
  const logs = update.split('\n').filter(x => !!x.trim()).map(x => `* ${x}`).join('\n');
  const message = `Update for ${dd}-${month}-${yyyy}\n\n${logs}`

  console.log(message);
}
