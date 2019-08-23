import React, { useEffect, useCallback } from 'react';
import { WebView } from 'react-native-webview';
import { NavigationScreenComponent } from 'react-navigation';
import { useDispatch } from 'react-redux';
import { accessToken } from '@model/auth/actions';
import { OAUTH_CALLBACK } from 'react-native-dotenv';

interface AuthenticateNavigationParams {
  oauthToken: string;
}

const Authenticate: NavigationScreenComponent<
  AuthenticateNavigationParams
> = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    const oauthToken = props.navigation.getParam('oauthToken');
    if (!oauthToken) {
      props.navigation.navigate('Login');
    }
  }, [props.navigation]);

  const handleNavigationChange = useCallback(
    event => {
      console.log(event);
      // maybe there is a better method to get oauth_verifier
      if (event.url.startsWith(OAUTH_CALLBACK)) {
        const query = (event.url as string)
          .split('?')[1]
          .split('&')
          .reduce((prev, group) => {
            const [key, value] = group.split('=');
            return Object.assign(prev, {
              [key]: value,
            });
          }, {});
        dispatch(accessToken.request(query.oauth_verifier as string));
      }
    },
    [dispatch]
  );

  return (
    <WebView
      source={{
        uri: `https://api.twitter.com/oauth/authenticate?oauth_token=${props.navigation.getParam(
          'oauthToken'
        )}`,
      }}
      onNavigationStateChange={handleNavigationChange}
    />
  );
};

export default Authenticate;
