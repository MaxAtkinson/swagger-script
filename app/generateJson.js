import _ from 'lodash';
import {
  STAGE_VARIABLES,
  DEFAULT_RESPONSES,
  DEFAULT_PRODUCES,
  BASE_SWAGGER_DEFINITION,
  DEFAULT_GATEWAY_INTEGRATION,
  SUPPORTED_HTTP_METHODS,
} from '../settings';

export function generateMethodJson(inputMethods, endpoint) {
  const json = {};
  // Generate JSON for each method type
  _.forOwn(inputMethods, (methodObj, methodKey) => {
    if (SUPPORTED_HTTP_METHODS.indexOf(methodKey.toLowerCase()) == -1) {
      throw new Error('Unsupported HTTP method');
    }
    json[methodKey] = {};
    json[methodKey].produces = methodObj.produces || DEFAULT_PRODUCES;
    json[methodKey]['x-amazon-apigateway-integration'] = methodObj['gateway-integration'] || 
      generateGatewayIntegrationJson(methodObj.addTo, endpoint, methodKey);
  });
  return json;
}

export function generateGatewayIntegrationJson(addTo, endpoint, method) {
  // JSON for the AWS gateway integration extension
  const json = { ...DEFAULT_GATEWAY_INTEGRATION };
  json.uri = STAGE_VARIABLES[addTo] + endpoint;
  json.httpMethod = method.toUpperCase();
  return json;
}

 // json[methodKey]['x-amazon-apigateway-integration'] = methodObj['gateway-integration'] || generateGatewayIntegrationJson(methodObj, endpoint);