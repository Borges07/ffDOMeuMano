const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
fs.mkdirSync(output, { recursive: true });
for (const entry of ['index.html', 'revisao.html', 'src', 'assets']) {
  fs.cpSync(path.join(root, entry), path.join(output, entry), { recursive: true });
}
console.log('Site preparado em dist/');
