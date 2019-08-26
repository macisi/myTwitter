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
        const query: Record<string, string> = (event.url as string)
          .split('?')[1]
          .split('&')
          .reduce((prev, group) => {
            const [key, value] = group.split('=');
            return Object.assign(prev, {
              [key]: value,
            });
          }, {});
        const oauthToken = props.navigation.getParam('oauthToken');
        dispatch(
          accessToken.request({
            oauth_verifier: query.oauth_verifier,
            oauth_token: oauthToken,
          })
        );
      }
    },
    [dispatch, props.navigation]
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
