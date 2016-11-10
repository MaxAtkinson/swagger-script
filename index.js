import _ from 'lodash';
import { readFile, writeFile } from './app/fileUtils';
import colors from 'colors';
import {
  STAGE_VARIABLES,
  DEFAULT_RESPONSES,
  DEFAULT_PRODUCES,
  BASE_SWAGGER_DEFINITION,
} from './settings';

if (process.argv.length < 3) {
  console.log('Usage: babel-node index <filename>'.red);
  process.exit(1);
}

const input = readFile(process.argv[2]);
const output = BASE_SWAGGER_DEFINITION;

_.forOwn(input, (value, key) => {
  console.log(key, value);
  output.paths[key] = {};
});

// const currentAPI = JSON.parse(fs.readFileSync('api.json'));
// Object.keys(currentAPI.paths).forEach((endpoint) => {
//   console.log(currentAPI.paths[endpoint].get);
// });

dumpOutput();
writeFile(output);

function dumpOutput() {
  console.log(JSON.stringify(output, null, '  ').red);
}