import { createAsyncAction } from 'typesafe-actions';

export const homeTimeline = createAsyncAction(
  'FETCH_HOME_TIMELINE',
  'FETCH_HOME_TIMELINE_SUCCESS',
  'FETCH_HOME_TIMELINE_FAILURE'
)<undefined, any[], Error>();
