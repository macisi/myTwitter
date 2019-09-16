import { createAsyncAction } from 'typesafe-actions';
import { Tweet, TIMELINE_REQUEST_PARAM, TimelineParameters } from 'twitter';

type SuccessPayload = {
  response: Tweet[];
};

export const homeTimeline = createAsyncAction(
  'FETCH_HOME_TIMELINE',
  'FETCH_HOME_TIMELINE_SUCCESS',
  'FETCH_HOME_TIMELINE_FAILURE'
)<
  TIMELINE_REQUEST_PARAM<TimelineParameters>,
  TIMELINE_REQUEST_PARAM<SuccessPayload>,
  Error
>();
