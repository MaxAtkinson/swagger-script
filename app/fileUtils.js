import fs from 'fs';

/*
  Adds '.json' on to any filename specified without the extension.
*/
function formatFileName(filename) {
  if (!filename.endsWith('.json')) filename += '.json';
  return filename;
}

/*
  Reads a file and parses it into a JSON object.
*/
export function readFile(filename) {
  console.log(`Reading file: ${filename}...`);
  return JSON.parse(fs.readFileSync(formatFileName(filename)));
}

/*
  Stringifies and writes a JSON object to a file.
*/
export function writeFile(json) {
  const outputFilename = 'output.json';
  fs.writeFileSync(outputFilename, JSON.stringify(json, null, '  '));
  console.log(`File created: ${outputFilename}.`);
}
