import { ActionType } from 'typesafe-actions';

import * as authActions from '@model/auth/actions';
import * as homeActions from '@model/home/actions';

const rootAction = {
  authActions,
  homeActions,
};

export type RootAction = ActionType<typeof rootAction>;
