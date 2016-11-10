import fs from 'fs';
import colors from 'colors';

function formatFileName(filename) {
  if (!filename.endsWith('.json')) filename += '.json';
  return filename;
}

export function readFile(filename) {
  filename = formatFileName(filename);
  console.log(`Reading file: ${filename}...`.green);
  try {
    return JSON.parse(fs.readFileSync(filename));
  } catch (err) {
    throw err;
  }
}

export function writeFile(json) {
  fs.writeFileSync('output.json', JSON.stringify(json, null, '  '));
  console.log('File created: output.json'.green);
}
