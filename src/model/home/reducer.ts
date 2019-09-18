import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { compose, concat, eqProps, uniqWith } from 'ramda';
import { TIMELINE_REQUEST_TYPE } from '@utils/enum';
import { Tweet } from 'twitter';
import bigInt from 'big-integer';
import { homeTimeline } from './actions';

const initialState = {
  timeline: {
    pending: false,
    data: [] as Tweet[],
  },
};

const mergeTimeline = compose<Tweet[], Tweet[], Tweet[], Tweet[]>(
  uniqWith(eqProps('id_str')),
  concat
);

const homeReducer = createReducer(initialState)
  .handleAction(homeTimeline.request, state =>
    produce(state, draft => {
      draft.timeline.pending = true;
    })
  )
  .handleAction(
    homeTimeline.success,
    (state, action: ReturnType<typeof homeTimeline.success>) =>
      produce(state, draft => {
        const { type, response } = action.payload;
        if (response.length) {
          switch (type) {
            case TIMELINE_REQUEST_TYPE.TOP:
              // case: refresh by since_id.
              if (
                draft.timeline.data.length &&
                bigInt(response[0].id_str).lesserOrEquals(
                  draft.timeline.data[0].id_str
                )
              ) {
                // if the oldest one from response is smaller than latest one in draft data,
                // then merge two lists after removing duplicates.
                draft.timeline.data = mergeTimeline(
                  response,
                  draft.timeline.data
                );
              } else {
                // else just replace the draft timeline.
                draft.timeline.data = response;
              }
              break;
            case TIMELINE_REQUEST_TYPE.BOTTOM:
              // case: load older timeline by max_id.
              // just concat two list.
              draft.timeline.data = draft.timeline.data.concat(response);
              break;
          }
        }
        draft.timeline.pending = false;
      })
  )
  .handleAction(homeTimeline.failure, state =>
    produce(state, draft => {
      draft.timeline.pending = false;
    })
  );

export default homeReducer;
