/*
  Change this to your API name.
*/
const API_NAME = null;

/*
  Base object for the final output - 'paths' property is populated.
*/
const API_TIMESTAMP = new Date().toISOString();
export const BASE_SWAGGER_DEFINITION = {
  'swagger': '2.0',
  'info': {
    'version': API_TIMESTAMP,
    'title': API_NAME || API_TIMESTAMP
  },
  'host': 'dev.mrmbrand-apis.net',
  'schemes': [
    'https'
  ],
  'paths': {},
  'definitions': {
    'Empty': {
      'type': 'object'
    }
  },
};

/*
  URLs for the API gateway extension.
*/
const PRODUCTS_API_URL = 'https://${stageVariables.productAPIUrl}';
const BESPOKE_MENUS_URL = 'https://${stageVariables.bespokeMenusUrl}';
export const STAGE_VARIABLES = {
  'products-api': PRODUCTS_API_URL,
  'bespoke-menus': BESPOKE_MENUS_URL,
};

/*
  Authorizaton header parameter object.
*/
export const AUTH_PARAMETER = {
  'name': 'Authorization',
  'in': 'header',
  'required': true,
  'type': 'string',
};

/*
  Default parameters.
*/
export const DEFAULT_PARAMETERS = [];

/*
  Supported HTTP methods, used for validation.
*/
export const SUPPORTED_HTTP_METHODS = [
  'get', 'post', 'put', 'delete', 'options',
];

/*
  Default response headers.
*/
export const DEFAULT_PRODUCES = [
  'application/json',
];

/*
  Default HTTP responses from routes.
*/
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

/*
  Default gateway integration settings.
*/
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

/*
  Endpoint for LetsEncrypt which must be added for HTTPS.
*/
export const LETSENCRYPT_ENDPOINT = {
  'get': {
    'consumes': [
      'application/json'
    ],
    'produces': [
      'text/plain'
    ],
    'parameters': [
      {
        'name': 'key',
        'in': 'path',
        'required': true,
        'type': 'string'
      }
    ],
    'responses': {
      '200': {
        'description': '200 response',
        'schema': {
          '$ref': '#/definitions/Empty'
        }
      }
    },
    'x-amazon-apigateway-integration': {
      'requestTemplates': {
        'application/json': '{\'statusCode\': 200}'
      },
      'responses': {
        'default': {
          'statusCode': '200',
          'responseTemplates': {
            'text/plain': '#if($stageVariables.acme.startsWith($input.params(\'key\')))$stageVariables.acme#end\n'
          }
        }
      },
      'passthroughBehavior': 'when_no_match',
      'type': 'mock'
    }
  }
};
