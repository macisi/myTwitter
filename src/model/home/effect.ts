import { getType } from 'typesafe-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { selectOAuthToken } from '@utils/helpers';
import { Tweet } from 'twitter';
import { homeTimeline } from './actions';
import { fetchHomeTimeline } from './service';

function* handleFetchTimeline() {
  try {
    const oauth: OAuthToken = yield call(selectOAuthToken);
    const response: Tweet[] = yield call(
      fetchHomeTimeline,
      oauth.oauth_token,
      oauth.oauth_token_secret
    );
    yield put(homeTimeline.success(response));
  } catch (err) {
    yield put(homeTimeline.failure(err));
  }
}

export default function*() {
  yield takeLatest(getType(homeTimeline.request), handleFetchTimeline);
}
