import { createAsyncAction } from 'typesafe-actions';
import { Tweet } from 'twitter';

export const homeTimeline = createAsyncAction(
  'FETCH_HOME_TIMELINE',
  'FETCH_HOME_TIMELINE_SUCCESS',
  'FETCH_HOME_TIMELINE_FAILURE'
)<undefined, Tweet[], Error>();
