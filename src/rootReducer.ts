import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import authReducer from '@model/auth/reducer';
import homeReducer from '@model/home/reducer';
import tweetReducer from '@model/tweet/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  tweet: tweetReducer,
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
