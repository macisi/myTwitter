import { getType } from 'typesafe-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { navigate } from '@utils/navigationService';
import { fetchRequestToken, fetchAccessToken } from './service';
import {
  requestToken,
  RequestToken,
  accessToken,
  AccessToken,
} from './actions';

function* handleRequestToken(): Generator {
  try {
    const response: RequestToken = yield call(fetchRequestToken);
    yield put(requestToken.success(response));
    navigate('Authenticate', {
      oauthToken: response.oauth_token,
    });
  } catch (err) {
    yield put(requestToken.failure(err));
  }
}

function* handleAccessToken(
  action: ReturnType<typeof accessToken.request>
): Generator {
  try {
    const response: AccessToken = yield call(fetchAccessToken, action.payload);
    yield put(accessToken.success(response));
    navigate('Home');
  } catch (err) {
    yield put(accessToken.failure(err));
  }
}

export default function*() {
  yield takeLatest(getType(requestToken.request), handleRequestToken);
  yield takeLatest(getType(accessToken.request), handleAccessToken);
}
