import { createAsyncAction } from 'typesafe-actions';
import { Tweet, TimelineParameters } from 'twitter';

export const homeTimeline = createAsyncAction(
  'FETCH_HOME_TIMELINE',
  'FETCH_HOME_TIMELINE_SUCCESS',
  'FETCH_HOME_TIMELINE_FAILURE'
)<TimelineParameters, Tweet[], Error>();
