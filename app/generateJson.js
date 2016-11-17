import _ from 'lodash';
import { extractPathParams, extractQueryParams } from './urlUtils';
import {
  STAGE_VARIABLES,
  DEFAULT_RESPONSES,
  DEFAULT_PRODUCES,
  DEFAULT_GATEWAY_INTEGRATION,
  SUPPORTED_HTTP_METHODS,
  DEFAULT_PARAMETERS,
  AUTH_PARAMETER,
  DEFAULT_OPTIONS_ENDPOINT
} from '../settings';

/*
  Main function - generates the JSON for each endpoint by iterating over
  each method defined in the input file.
*/
export default function generateMethodJson(input, endpoint) {
  const json = {};
  const parameters = generateParameterJson(endpoint, input.requiresAuth);
  if (input.cors != 'false') json.options = generateOptionsJson(Object.keys(input.methods));

  _.forOwn(input.methods, (methodObj, methodKey) => {
    json[methodKey] = {};
    if (SUPPORTED_HTTP_METHODS.indexOf(methodKey.toLowerCase()) == -1) {
      throw new Error('Unsupported HTTP method' + methodKey.red);
    }
    if (methodObj.responses) {
      json[methodKey].responses = {};
      methodObj.responses.map((code) => {
        json[methodKey].responses[code] = {
          'description': code + ' response',
          'schema': {
            '$ref': '#/definitions/Empty'
          },
          'headers': {
            'Access-Control-Allow-Origin': {
              'type': 'string'
            }
          }
        };
      });
      methodObj.responses = json[methodKey].responses;
    } else {
      json[methodKey].responses = DEFAULT_RESPONSES;
      methodObj.responses = DEFAULT_RESPONSES;
    }
    if (methodObj.consumes) json[methodKey].consumes = methodObj.consumes;
    json[methodKey].parameters = parameters || DEFAULT_PARAMETERS;
    json[methodKey].produces = methodObj.produces || DEFAULT_PRODUCES;
    json[methodKey]['x-amazon-apigateway-integration'] = methodObj['gateway-integration'] || 
      generateGatewayIntegrationJson(endpoint, input, methodObj, methodKey, parameters);
  });
  return json;

  function generateOptionsJson(methods) {
    const optionsJson = _.cloneDeep(DEFAULT_OPTIONS_ENDPOINT);
    const methodsString = methods.map(method => method.toUpperCase()).join();
    optionsJson['x-amazon-apigateway-integration'].responses.default
      .responseParameters['method.response.header.Access-Control-Allow-Methods'] = `\'${methodsString}\'`;
    return optionsJson;
  }
}

/*
  Generates JSON for parameters taken from the path, querystring and
  the requiresAuth property.
*/
function generateParameterJson(endpoint, requiresAuth = true) {
  const pathParams = extractPathParams(endpoint);
  const queryParams = extractQueryParams(endpoint);
  const params = pathParams.concat(queryParams);

  if (requiresAuth === 'true' || requiresAuth === true) {
    params.push(AUTH_PARAMETER);
  }
  return params;
}

/*
  Generates JSON for the API gateway integration extension.
*/
function generateGatewayIntegrationJson(endpoint, input, methodObj, methodKey, params) {
  const json = _.cloneDeep(DEFAULT_GATEWAY_INTEGRATION);

  if (Object.keys(STAGE_VARIABLES).indexOf(input.addTo) == -1) {
    throw new Error(`Provide a valid addTo property for each HTTP route.
      One of: ${Object.keys(STAGE_VARIABLES)}`.red);
  }
  json.uri = STAGE_VARIABLES[input.addTo] + (input.dest || endpoint.split('?')[0])
  json.httpMethod = methodKey.toUpperCase();
  json.requestParameters = generateRequestParameterJson(params);
  json.responses = generateResponseJson(methodObj.responses);
  return json;

  /*
    Generates the requestParams property for the extension from the method's parameters.
  */
  function generateRequestParameterJson(params) {
    const requestParams = {};

    params.map((param) => {
      const key = `integration.request.${param.in == 'query' ? 'querystring' : param.in}.${param.name}`;
      const val = `method.request.${param.in == 'query' ? 'querystring' : param.in}.${param.name}`;
      requestParams[key] = val;
    });
    return requestParams;
  }

  /*
    Generates the responses property for the extension from the method's responses.
  */
  function generateResponseJson(responses) {
    const responseJson = {};
    const statusCodes = Object.keys(responses);
    const lowest = Math.min.apply(Math, statusCodes);
    statusCodes.map((code) => {
      if (code == '500') {
        responseJson['5\\d{2}'] = {
          statusCode: code
        };
      } else {
        responseJson[code] = {
          statusCode: code
        };
      }
    });
    responseJson.default = {
      statusCode: lowest,
      responseParameters: {
        'method.response.header.Access-Control-Allow-Origin': '\'*\''
      }
    }
    delete responseJson[lowest];
    return responseJson;
  }
}
