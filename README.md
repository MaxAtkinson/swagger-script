# Swagger Script

Script for generating AWS API Gateway Swagger JSON.

## Requirements
- `npm install -g babel-cli`

## Installation
- `npm install`

## Usage
- Update the API_NAME constant in `settings.js`.
- Create an input file in the format:
```json
{
  "/api/{someParam}/route/{someOtherParam}?requiredParam=true&optionalParam=false": {
    "addTo": "products-api",
    "requiresAuth": "true",
    "methods": {
      "get": {},
      "post": {
        "responses": ["400"]
      }
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
    "version": "2016-11-16T16:35:14.985Z",
    "title": "2016-11-16T16:35:14.985Z"
  },
  "host": "dev.mrmbrand-apis.net",
  "schemes": [
    "https"
  ],
  "paths": {
    "/api/{someParam}/route/{someOtherParam}": {
      "get": {
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
          "400": {
            "description": "400 response",
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
        "x-amazon-apigateway-integration": {
          "passthroughBehavior": "when_no_match",
          "type": "http",
          "responses": {
            "400": {
              "statusCode": "400"
            },
            "401": {
              "statusCode": "401"
            },
            "403": {
              "statusCode": "403"
            },
            "404": {
              "statusCode": "404"
            },
            "5\\d{2}": {
              "statusCode": "500"
            },
            "default": {
              "statusCode": 200,
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
            "integration.request.querystring.requiredParam": "method.request.querystring.requiredParam",
            "integration.request.querystring.optionalParam": "method.request.querystring.optionalParam",
            "integration.request.header.Authorization": "method.request.header.Authorization"
          }
        }
      },
      "post": {
        "responses": {
          "400": {
            "description": "400 response",
            "schema": {
              "$ref": "#/definitions/Empty"
            },
            "headers": {
              "Access-Control-Allow-Origin": {
                "type": "string"
              }
            }
          }
        },
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
        "x-amazon-apigateway-integration": {
          "passthroughBehavior": "when_no_match",
          "type": "http",
          "responses": {
            "default": {
              "statusCode": 400,
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
            "integration.request.querystring.requiredParam": "method.request.querystring.requiredParam",
            "integration.request.querystring.optionalParam": "method.request.querystring.optionalParam",
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
