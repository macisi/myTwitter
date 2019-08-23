import { createAsyncAction } from 'typesafe-actions';
import { NavigationScreenProp } from 'react-navigation';

export interface RequestToken {
  oauth_token: string;
  oauth_token_secret: string;
  oauth_callback_confirmed: boolean;
}

export interface AccessToken {
  oauth_token: string;
  oauth_token_secret: string;
}

export const requestToken = createAsyncAction(
  'FETCH_REQUEST_TOKEN',
  'FETCH_REQUEST_TOKEN_SUCCESS',
  'FETCH_REQUEST_TOKEN_FAILURE'
)<NavigationScreenProp<{}>, RequestToken, Error>();

export const accessToken = createAsyncAction(
  'FETCH_ACCESS_TOKEN',
  'FETCH_ACCESS_TOKEN_SUCCESS',
  'FETCH_ACCESS_TOKEN_FAILURE'
)<string, AccessToken, Error>();
