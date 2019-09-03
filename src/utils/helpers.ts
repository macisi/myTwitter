/**
 * Global Helpers Functions
 */
import { HmacSHA1, enc } from 'crypto-js';
import { select } from 'redux-saga/effects';
import { RootState } from '@src/rootReducer';
import { MediaEntity, Sizes } from 'twitter-d';

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

/**
 * select oauth token in effect
 */
export function* selectOAuthToken() {
  const res: OAuthToken = yield select<(state: RootState) => OAuthToken>(
    state => ({
      oauth_token: state.auth.accessToken.oauth_token,
      oauth_token_secret: state.auth.accessToken.oauth_token_secret,
    })
  );
  return res;
}

export function getPhotoUrl(media: MediaEntity, size: keyof Sizes) {
  const url = media.media_url_https;
  const result = url.match(/^(.*)\.([^.]*)$/);
  if (result) {
    return `${result[1]}?format=${result[2]}&name=${size}`;
  }
  return url;
}
