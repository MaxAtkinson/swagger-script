import querystring from 'querystring';

/*
  Extracts path parameters from a url given in the form 'https://google.com/query/{key}'
  and returns them in the swagger format.
*/
export function extractPathParams(endpoint) {
  const matches = endpoint.match(/\{.*?\}/g);
  if (!matches) return [];
  return matches.map((param) => {
    return {
      name: param.replace('{', '').replace('}', ''),
      in: 'path',
      required: true,
      type: 'string'
    };
  });
  
}

/*
  Extracts querystring parameters from a url given in the form 'https://google.com/search?key=value'
  and returns them in the swagger format.
*/
export function extractQueryParams(endpoint) {
  const queryParams = querystring.parse(endpoint.split('?')[1]);
  if (!queryParams) return [];
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