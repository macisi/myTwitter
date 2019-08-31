import { postData } from '@utils/request';
import { OAUTH_CALLBACK } from 'react-native-dotenv';
import { AccessTokenRequestPayload } from './actions';

export const fetchRequestToken = () => {
  const url = '/oauth/request_token';
  return postData<string>({}, url, {
    oauth_callback: OAUTH_CALLBACK,
  }).then(res => {
    return res.split('&').reduce((prev, group) => {
      const [key, value] = group.split('=');
      return Object.assign(prev, {
        [key]: value,
      });
    }, {});
  });
};

export const fetchAccessToken = (params: AccessTokenRequestPayload) => {
  const url = '/oauth/access_token';
  return postData<string>(
    {
      oauth_token: params.oauth_token,
    },
    url,
    {
      oauth_verifier: params.oauth_verifier,
    }
  ).then(res =>
    res.split('&').reduce((prev, group) => {
      const [key, value] = group.split('=');
      return Object.assign(prev, {
        [key]: value,
      });
    }, {})
  );
};
