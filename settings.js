export const BASE_SWAGGER_DEFINITION = {
  'swagger': '2.0',
  'info': {
    'version': '2016-11-09T12:52:01Z',
    'title': '  MRM Brand'
  },
  'host': 'dev.mrmbrand-apis.net',
  'schemes': [
    'https'
  ],
  'paths': {}
};

const PRODUCTS_API_URL = 'https://${stageVariables.productAPIUrl}';
const BESPOKE_MENUS_URL = 'https://${stageVariables.bespokeMenusUrl}';

export const STAGE_VARIABLES = {
  'products-api': PRODUCTS_API_URL,
  'bespoke-menus': BESPOKE_MENUS_URL,
};

export const DEFAULT_RESPONSES = {
  '200': {},
  '401': {},
  '403': {},
  '500': {},
};

export const DEFAULT_PRODUCES = [
  'application/json',
];

export const SUPPORTED_HTTP_METHODS = [
  'get', 'post', 'put', 'delete', 'options',
];

export const DEFAULT_GATEWAY_INTEGRATION = {
  'passthroughBehavior': 'when_no_match',
  'type': 'http'
};

