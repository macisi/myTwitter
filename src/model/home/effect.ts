import { getType } from 'typesafe-actions';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { RootState } from '@src/rootReducer';
import { homeTimeline } from './actions';
import { fetchHomeTimeline } from './service';

function* handleFetchTimeline(): Generator {
  try {
    const oauth = yield select<(s: RootState) => Record<string, string>>(
      state => ({
        oauth_token: state.auth.accessToken.oauth_token,
        oauth_token_secret: state.auth.accessToken.oauth_token_secret,
      })
    );
    const response = yield call(
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
