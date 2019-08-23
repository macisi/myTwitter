/**
 * Global Helpers Functions
 */
import { HmacSHA1, enc } from 'crypto-js';

function encodeRFC3987(str: string | number) {
  return encodeURIComponent(str).replace(/[!'()*]/g, c => {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

/**
 * generate oauth signature
 */
export const generateOauthSignature = (
  /**
   * Http Method, POST or GET
   */
  httpMethod: 'POST' | 'GET',
  /**
   * Base Url
   */
  baseUrl: string,
  /**
   * Request Parameters, the URL (as part of the querystring) and the request body
   */
  parameters: Record<string, string | number>,
  /**
   * Consumer Secret
   */
  consumerSecret: string,
  /**
   * oAuth Token Secret
   */
  tokenSecret: string = ''
) => {
  let initial = [httpMethod, encodeRFC3987(baseUrl)];
  const parameterStr = Object.keys(parameters)
    .sort()
    .reduce<string[]>(
      (prev, key) =>
        prev.concat(`${encodeRFC3987(key)}=${encodeRFC3987(parameters[key])}`),
      []
    )
    .join('&');
  const signature = initial.concat(encodeRFC3987(parameterStr)).join('&');
  const key = [encodeRFC3987(consumerSecret), encodeRFC3987(tokenSecret)].join(
    '&'
  );
  return HmacSHA1(signature, key).toString(enc.Base64);
};

/**
 * Generate Oauth Nonce
 */
export const generateOauthNonce = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]/, '')
    .substr(2);

/**
 * Generate Authorization Header
 * @parameters Request Parameters
 */
export const generateAuthorizationHeader = (
  parameters: Record<string, string | number>
) => {
  return (
    'OAuth ' +
    Object.keys(parameters)
      .reduce<string[]>((prev, key) => {
        prev.push(
          [encodeRFC3987(key), `"${encodeRFC3987(parameters[key])}"`].join('=')
        );
        return prev;
      }, [])
      .join(', ')
  );
};
