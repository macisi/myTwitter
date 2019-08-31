import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { Timeline } from 'twitter';
import { homeTimeline } from './actions';

const initialState = {
  timeline: {
    pending: false,
    data: [] as Timeline[],
  },
};

const homeReducer = createReducer(initialState)
  .handleAction(homeTimeline.request, state =>
    produce(state, draft => {
      draft.timeline.pending = true;
    })
  )
  .handleAction(homeTimeline.success, (state, action) =>
    produce(state, draft => {
      draft.timeline.pending = false;
      draft.timeline.data = action.payload;
    })
  )
  .handleAction(homeTimeline.failure, state =>
    produce(state, draft => {
      draft.timeline.pending = false;
    })
  );

export default homeReducer;
