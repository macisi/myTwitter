import { ActionType } from 'typesafe-actions';

import * as authActions from '@model/auth/actions';
import * as homeActions from '@model/home/actions';
import * as tweetActions from '@model/tweet/actions';

const rootAction = {
  authActions,
  homeActions,
  tweetActions,
};

export type RootAction = ActionType<typeof rootAction>;
