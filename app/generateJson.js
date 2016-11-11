import _ from 'lodash';
import { extractPathParams, extractQueryParams } from './urlUtils';
import {
  STAGE_VARIABLES,
  DEFAULT_RESPONSES,
  DEFAULT_PRODUCES,
  BASE_SWAGGER_DEFINITION,
  DEFAULT_GATEWAY_INTEGRATION,
  SUPPORTED_HTTP_METHODS,
  DEFAULT_PARAMETERS,
  AUTH_PARAMETER,
} from '../settings';

export default function generateMethodJson(input, endpoint) {
  const json = {};
  // Generate JSON for each method type
  const parameters = generateParameterJson(endpoint, input.requiresAuth);
  _.forOwn(input.methods, (methodObj, methodKey) => {
    if (SUPPORTED_HTTP_METHODS.indexOf(methodKey.toLowerCase()) == -1) {
      throw new Error('Unsupported HTTP method' + methodKey.red);
    }
    json[methodKey] = {};
    json[methodKey].produces = methodObj.produces || DEFAULT_PRODUCES;
    json[methodKey].parameters = parameters || DEFAULT_PARAMETERS;
    json[methodKey].responses = methodObj.responses || DEFAULT_RESPONSES;
    json[methodKey]['x-amazon-apigateway-integration'] = methodObj['gateway-integration'] || 
      generateGatewayIntegrationJson(endpoint, input.addTo, methodObj, methodKey);
  });
  return json;
}

function generateParameterJson(endpoint, requiresAuth) {
  let parameters = [];
  const pathParams = extractPathParams(endpoint);
  const queryParams = extractQueryParams(endpoint);
  
  parameters = pathParams.concat(queryParams);
  if (requiresAuth === 'true' || requiresAuth === true) {
    parameters.push(AUTH_PARAMETER);
  }
  return parameters;
}

function generateGatewayIntegrationJson(endpoint, addTo, methodObj, methodKey) {
  const json = { ...DEFAULT_GATEWAY_INTEGRATION };
  if (Object.keys(STAGE_VARIABLES).indexOf(addTo) == -1) {
    throw new Error(`Provide a valid addTo property for each HTTP route.
      One of: ${Object.keys(STAGE_VARIABLES)}`.red);
  }
  // JSON for the AWS gateway integration extension
  json.uri = STAGE_VARIABLES[addTo] + endpoint;
  json.httpMethod = methodKey.toUpperCase();
  json.requestParameters = {};
  json.responses = methodObj.responses || json.responses;
  return json;
}
