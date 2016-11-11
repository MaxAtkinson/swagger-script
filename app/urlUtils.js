import querystring from 'querystring';

export function extractPathParams(endpoint) {
  return endpoint.match(/\{.*?\}/g).map((param) => {
    return {
      name: param.replace('{', '').replace('}', ''),
      in: 'path',
      required: true,
      type: 'string'
    };
  });
}

export function extractQueryParams(endpoint) {
  const queryParams = querystring.parse(endpoint.split('?')[1]);
  return Object.keys(queryParams).map((param) => {
    const required = (queryParams[param] == 'true') || false;
    return {
      name: param,
      in: 'query',
      required,
      type: 'string'
    };
  });
}