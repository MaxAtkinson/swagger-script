export const BASE_SWAGGER_DEFINITION = {
  'swagger': '2.0',
  'info': {
    'version': new Date().toISOString(),
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
  '200': {
    'description': '200 response',
    'schema': {
      '$ref': '#/definitions/Empty'
    },
    'headers': {
      'Access-Control-Allow-Origin': {
        'type': 'string'
      }
    }
  },
  '401': {
    'description': '401 response',
    'headers': {
      'Access-Control-Allow-Origin': {
        'type': 'string'
      }
    }
  },
  '403': {
    'description': '403 response',
    'headers': {
      'Access-Control-Allow-Origin': {
        'type': 'string'
      }
    }
  },
  '404': {
    'description': '404 response',
    'headers': {
      'Access-Control-Allow-Origin': {
        'type': 'string'
      }
    }
  },
  '500': {
    'description': '500 response',
    'headers': {
      'Access-Control-Allow-Origin': {
        'type': 'string'
      }
    }
  },
};

export const DEFAULT_PARAMETERS = [];

export const AUTH_PARAMETER = {
  'name': 'Authorization',
  'in': 'header',
  'required': true,
  'type': 'string',
};

export const DEFAULT_PRODUCES = [
  'application/json',
];

export const SUPPORTED_HTTP_METHODS = [
  'get', 'post', 'put', 'delete', 'options',
];

export const DEFAULT_GATEWAY_INTEGRATION = {
  'passthroughBehavior': 'when_no_match',
  'type': 'http',
  'responses': {
    '401': {
      'statusCode': '401',
      'responseParameters': {
        'method.response.header.Access-Control-Allow-Origin': '\'*\''
      }
    },
    '403': {
      'statusCode': '403',
      'responseParameters': {
        'method.response.header.Access-Control-Allow-Origin': '\'*\''
      }
    },
    '404': {
      'statusCode':  '404',
      'responseParameters': {
        'method.response.header.Access-Control-Allow-Origin': '\'*\''
      }
    },
    'default': {
      'statusCode': '200',
      'responseParameters': {
        'method.response.header.Access-Control-Allow-Origin': '\'*\''
      }
    },
    '5\\d{2}': {
      'statusCode': '500',
      'responseParameters': {
        'method.response.header.Access-Control-Allow-Origin': '\'*\''
      }
    }
  },
};

