import {
  generateOauthSignature,
  generateOauthNonce,
  generateAuthorizationHeader,
} from '@utils/helpers';
import request from '@utils/request';
import { CONSUMER_KEY, CONSUMER_SECRET, OAUTH_CALLBACK } from 'react-native-dotenv';

export const fetchRequestToken = () => {
  const method = 'POST';
  const url = '/oauth/request_token';
  const parameters = {
    oauth_consumer_key: CONSUMER_KEY,
    oauth_nonce: generateOauthNonce(),
    oauth_callback: OAUTH_CALLBACK,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: String(new Date().getTime()).substr(0, 10),
    oauth_version: '1.0',
  };

  const oauthSignature = generateOauthSignature(
    method,
    `https://api.twitter.com${url}`,
    parameters,
    CONSUMER_SECRET
  );

  const Authorization = generateAuthorizationHeader({
    ...parameters,
    oauth_signature: oauthSignature,
  });

  return request
    .post<string, string>(
      url,
      {
        oauth_callback: encodeURIComponent(parameters.oauth_callback),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization,
        },
      }
    )
    .then(res => {
      return res.split('&').reduce((prev, group) => {
        const [key, value] = group.split('=');
        return Object.assign(prev, {
          [key]: value,
        });
      }, {});
    });
};

export const fetchAccessToken = (oauth_verifier: string) => {
  return request.post('/oauth/access_token', {
    oauth_verifier,
  });
};
