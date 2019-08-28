import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { homeTimeline } from './actions';

const initialState = {
  timeline: {
    pending: false,
  },
};

const homeReducer = createReducer(initialState).handleAction(
  homeTimeline.request,
  state =>
    produce(state, draft => {
      draft.timeline.pending = true;
    })
);

export default homeReducer;
