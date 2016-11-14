import _ from 'lodash';
import colors from 'colors';
import { BASE_SWAGGER_DEFINITION, LETSENCRYPT_ENDPOINT } from './settings';
import { readFile, writeFile } from './app/fileUtils';
import generateJson from './app/generateJson';

if (process.argv.length != 3) {
  console.log('Usage: babel-node index <filename>'.red);
  process.exit(1);
} else {
  main();
}

/*
  Initialises the output with the letsencrypt endpoint and proceeds
  to iterate over each endpoint defined in the input file, generating
  JSON for each.
*/
function main() {
  const input = readFile(process.argv[2]);
  const output = BASE_SWAGGER_DEFINITION;

  _.forOwn(input, (val, endpoint) => {
    console.log(`Creating '${endpoint}'...`.blue);
    output.paths[endpoint.split('?')[0]] = generateJson(val, endpoint)
  });

  // dumpOutput();
  writeFile(output);

  function dumpOutput() {
    console.log(JSON.stringify(output, null, '  ').red);
    console.log(`${Object.keys(output.paths).length - 1} new routes added.`.green);
  }
}
