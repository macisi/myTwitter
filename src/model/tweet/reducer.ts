import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { path } from 'ramda';
import { Tweet } from 'twitter';
import { tweet } from './actions';

interface TweetObject {
  [id: string]: Tweet;
}

const initialState = {
  pending: false,
  ids: [] as string[],
  tweets: {} as TweetObject,
};

const getId = path<string>(['payload', 'id_str']);

const tweetReducer = createReducer(initialState)
  .handleAction(tweet.request, state =>
    produce(state, draft => {
      draft.pending = true;
    })
  )
  .handleAction(tweet.success, (state, action) =>
    produce(state, draft => {
      draft.pending = false;
      const id = getId(action);
      if (id && !draft.ids.includes(id)) {
        draft.ids.push(id);
        draft.tweets[id] = action.payload;
      }
    })
  )
  .handleAction(tweet.failure, state =>
    produce(state, draft => {
      draft.pending = false;
    })
  );

export default tweetReducer;
