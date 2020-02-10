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

function logStatusUpdate(logContent, { dd, mm, yyyy }) {
  const withIndentation = (str, times) => ' '.repeat(times) + str;

  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][mm];
  const logs = JSON.parse(logContent);
  const header = `${'*'.repeat(10)}Update for ${dd}-${month}-${yyyy}${'*'.repeat(10)}\n`
  const grouped = groupBy(logs, l => l.repositoryName);

  console.log(header);
  grouped.forEach((logs, repositoryName) => {
    console.log(`Repository: ${repositoryName}`);

    groupBy(logs, l => l.branchName).forEach((ll, branchName) => {
      console.log(withIndentation(`Branch: ${branchName}`, 2));
      ll
        .filter(l => !l.commitMessage.trim().startsWith('Merge branch'))
        .map(processCommits)
        .forEach(l => console.log(withIndentation('👉 ' + l.commitMessage, 4)));

      console.log('\n');
    });
  });
}

function groupBy(items, fn) {
  return items.reduce((res, i) => {
    const key = fn(i);
    const grouped = res.get(key) || [];
    res.set(key, [...grouped, i]);
    return res;
  }, new Map());
}

function processCommits(c) {
  if (c.commitMessage.length < 100) {
    return c;
  }

  const { commitMessage } = c;
  return {
    ...c,
    commitMessage: commitMessage.slice(0, 100) + '...',
  };
}
