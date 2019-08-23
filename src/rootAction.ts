import { ActionType } from 'typesafe-actions';

import * as authActions from '@model/auth/actions';

const rootAction = {
  authActions,
};

export type RootAction = ActionType<typeof rootAction>;
