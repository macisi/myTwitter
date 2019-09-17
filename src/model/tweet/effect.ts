import { getType } from 'typesafe-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { selectOAuthToken } from '@utils/helpers';
import { Tweet } from 'twitter';
import { tweet } from './actions';
import { getTweetById } from './service';

function* handleFetchTweet(action: ReturnType<typeof tweet.request>) {
  try {
    const oauth: OAuthToken = yield call(selectOAuthToken);
    const response: Tweet = yield call(
      getTweetById,
      oauth.oauth_token,
      oauth.oauth_token_secret,
      action.payload
    );
    yield put(tweet.success(response));
  } catch (err) {
    yield put(tweet.failure(err));
  }
}

export default function*() {
  yield takeLatest(getType(tweet.request), handleFetchTweet);
}
