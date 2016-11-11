# Swagger Script

Script for generating AWS API Gateway Swagger JSON.

## Requirements
- `npm install -g babel-cli`

## Installation
- `npm install`

## Usage
- Create an input file in the format:
```json
{
  "/api/{someParam}/route/{someOtherParam}?requiredParam=true&optionalParam=false": {
    "addTo": "products-api",
    "requiresAuth": "true",
    "methods": {
      "get": {},
      "post": {}
    }
  }
}
```
- HTTP Responses will default to those defined in `settings.js` but can be overridden within the http method JSON.
- Run `babel-node index <filename>`.
- The output file, `output.json` will be created in the current directory.
- The above JSON will generate:
```json
{
  "swagger": "2.0",
  "info": {
    "version": "2016-11-11T12:27:10.100Z",
    "title": "MRM Brand"
  },
  "host": "dev.mrmbrand-apis.net",
  "schemes": [
    "https"
  ],
  "paths": {
    "/.well-known/acme-challenge/{key}": {
      "get": {
        "consumes": [
          "application/json"
        ],
        "produces": [
          "text/plain"
        ],
        "parameters": [
          {
            "name": "key",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "200 response",
            "schema": {
              "$ref": "#/definitions/Empty"
            }
          }
        },
        "x-amazon-apigateway-integration": {
          "requestTemplates": {
            "application/json": "{'statusCode': 200}"
          },
          "responses": {
            "default": {
              "statusCode": "200",
              "responseTemplates": {
                "text/plain": "#if($stageVariables.acme.startsWith($input.params('key')))$stageVariables.acme#end\n"
              }
            }
          },
          "passthroughBehavior": "when_no_match",
          "type": "mock"
        }
      }
    },
    "/api/{someParam}/route/{someOtherParam}": {
      "get": {
        "parameters": [
          {
            "name": "someParam",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "someOtherParam",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "requiredParam",
            "in": "query",
            "required": true,
            "type": "string"
          },
          {
            "name": "optionalParam",
            "in": "query",
            "required": false,
            "type": "string"
          },
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "type": "string"
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "200 response",
            "schema": {
              "$ref": "#/definitions/Empty"
            },
            "headers": {
              "Access-Control-Allow-Origin": {
                "type": "string"
              }
            }
          },
          "401": {
            "description": "401 response",
            "headers": {
              "Access-Control-Allow-Origin": {
                "type": "string"
              }
            }
          },
          "403": {
            "description": "403 response",
            "headers": {
              "Access-Control-Allow-Origin": {
                "type": "string"
              }
            }
          },
          "404": {
            "description": "404 response",
            "headers": {
              "Access-Control-Allow-Origin": {
                "type": "string"
              }
            }
          },
          "500": {
            "description": "500 response",
            "headers": {
              "Access-Control-Allow-Origin": {
                "type": "string"
              }
            }
          }
        },
        "x-amazon-apigateway-integration": {
          "passthroughBehavior": "when_no_match",
          "type": "http",
          "responses": {
            "401": {
              "statusCode": "401",
              "responseParameters": {
                "method.response.header.Access-Control-Allow-Origin": "'*'"
              }
            },
            "403": {
              "statusCode": "403",
              "responseParameters": {
                "method.response.header.Access-Control-Allow-Origin": "'*'"
              }
            },
            "404": {
              "statusCode": "404",
              "responseParameters": {
                "method.response.header.Access-Control-Allow-Origin": "'*'"
              }
            },
            "default": {
              "statusCode": "200",
              "responseParameters": {
                "method.response.header.Access-Control-Allow-Origin": "'*'"
              }
            },
            "5\\d{2}": {
              "statusCode": "500",
              "responseParameters": {
                "method.response.header.Access-Control-Allow-Origin": "'*'"
              }
            }
          },
          "uri": "https://${stageVariables.productAPIUrl}/api/{someParam}/route/{someOtherParam}",
          "httpMethod": "GET",
          "requestParameters": {
            "integration.request.path.someParam": "method.request.path.someParam",
            "integration.request.path.someOtherParam": "method.request.path.someOtherParam",
            "integration.request.query.requiredParam": "method.request.query.requiredParam",
            "integration.request.query.optionalParam": "method.request.query.optionalParam",
            "integration.request.header.Authorization": "method.request.header.Authorization"
          }
        }
      },
      "post": {
        "parameters": [
          {
            "name": "someParam",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "someOtherParam",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "requiredParam",
            "in": "query",
            "required": true,
            "type": "string"
          },
          {
            "name": "optionalParam",
            "in": "query",
            "required": false,
            "type": "string"
          },
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "type": "string"
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "200 response",
            "schema": {
              "$ref": "#/definitions/Empty"
            },
            "headers": {
              "Access-Control-Allow-Origin": {
                "type": "string"
              }
            }
          },
          "401": {
            "description": "401 response",
            "headers": {
              "Access-Control-Allow-Origin": {
                "type": "string"
              }
            }
          },
          "403": {
            "description": "403 response",
            "headers": {
              "Access-Control-Allow-Origin": {
                "type": "string"
              }
            }
          },
          "404": {
            "description": "404 response",
            "headers": {
              "Access-Control-Allow-Origin": {
                "type": "string"
              }
            }
          },
          "500": {
            "description": "500 response",
            "headers": {
              "Access-Control-Allow-Origin": {
                "type": "string"
              }
            }
          }
        },
        "x-amazon-apigateway-integration": {
          "passthroughBehavior": "when_no_match",
          "type": "http",
          "responses": {
            "401": {
              "statusCode": "401",
              "responseParameters": {
                "method.response.header.Access-Control-Allow-Origin": "'*'"
              }
            },
            "403": {
              "statusCode": "403",
              "responseParameters": {
                "method.response.header.Access-Control-Allow-Origin": "'*'"
              }
            },
            "404": {
              "statusCode": "404",
              "responseParameters": {
                "method.response.header.Access-Control-Allow-Origin": "'*'"
              }
            },
            "default": {
              "statusCode": "200",
              "responseParameters": {
                "method.response.header.Access-Control-Allow-Origin": "'*'"
              }
            },
            "5\\d{2}": {
              "statusCode": "500",
              "responseParameters": {
                "method.response.header.Access-Control-Allow-Origin": "'*'"
              }
            }
          },
          "uri": "https://${stageVariables.productAPIUrl}/api/{someParam}/route/{someOtherParam}",
          "httpMethod": "POST",
          "requestParameters": {
            "integration.request.path.someParam": "method.request.path.someParam",
            "integration.request.path.someOtherParam": "method.request.path.someOtherParam",
            "integration.request.query.requiredParam": "method.request.query.requiredParam",
            "integration.request.query.optionalParam": "method.request.query.optionalParam",
            "integration.request.header.Authorization": "method.request.header.Authorization"
          }
        }
      }
    }
  },
  "definitions": {
    "Empty": {
      "type": "object"
    }
  }
}
```
