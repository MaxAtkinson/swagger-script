import _ from 'lodash';
import colors from 'colors';
import { BASE_SWAGGER_DEFINITION } from './settings';
import { readFile, writeFile } from './app/fileUtils';
import {
  generateMethodJson,
  generateGatewayIntegrationJson,
} from './app/generateJson';

if (process.argv.length != 3) {
  console.log('Usage: babel-node index <filename>'.red);
  process.exit(1);
} else {
  main();
}

function main() {
  const input = readFile(process.argv[2]);
  const output = BASE_SWAGGER_DEFINITION;

  // Generate JSON for each endpoint's methods
  _.forOwn(input, (endpointObj, endpointKey) => {
    output.paths[endpointKey] = generateMethodJson(endpointObj, endpointKey);
  });

  console.log(JSON.stringify(output, null, '  ').red);
  writeFile(output);
}