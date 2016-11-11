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
} from '../settings';

/*
  Main function - generates the JSON for each endpoint by iterating over
  each method defined in the input file.
*/
export default function generateMethodJson(input, endpoint) {
  const json = {
    parameters: generateParameterJson(endpoint, input.requiresAuth),
  };

  _.forOwn(input.methods, (methodObj, methodKey) => {
    if (SUPPORTED_HTTP_METHODS.indexOf(methodKey.toLowerCase()) == -1) {
      throw new Error('Unsupported HTTP method' + methodKey.red);
    }
    json[methodKey] = {};
    json[methodKey].parameters = json.parameters || DEFAULT_PARAMETERS;
    json[methodKey].produces = methodObj.produces || DEFAULT_PRODUCES;
    json[methodKey].responses = methodObj.responses || DEFAULT_RESPONSES;
    json[methodKey]['x-amazon-apigateway-integration'] = methodObj['gateway-integration'] || 
      generateGatewayIntegrationJson(endpoint, input.addTo, methodObj, methodKey, json.parameters);
  });
  return json;
}

/*
  Generates JSON for parameters taken from the path, querystring and
  the requiresAuth property.
*/
function generateParameterJson(endpoint, requiresAuth) {
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
function generateGatewayIntegrationJson(endpoint, addTo, methodObj, methodKey, params) {
  const json = { ...DEFAULT_GATEWAY_INTEGRATION };

  if (Object.keys(STAGE_VARIABLES).indexOf(addTo) == -1) {
    throw new Error(`Provide a valid addTo property for each HTTP route.
      One of: ${Object.keys(STAGE_VARIABLES)}`.red);
  }
  json.uri = STAGE_VARIABLES[addTo] + endpoint;
  json.httpMethod = methodKey.toUpperCase();
  json.requestParameters = generateRequestParameterJson(params);
  json.responses = methodObj.responses || json.responses;
  return json;

  /*
    Generates the requestParams property for the extension from the method's parameters.
  */
  function generateRequestParameterJson(params) {
    const requestParams = {};

    params.map((param) => {
      const key = `integration.request.${param.in}.${param.name}`;
      const val = `method.request.${param.in}.${param.name}`;
      requestParams[key] = val;
    });
    return requestParams;
  }
}
