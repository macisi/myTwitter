import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { requestToken, accessToken } from './actions';

const initialState = {
  requestToken: {
    pending: false,
    oauth_token: '',
    oauth_token_secret: '',
    oauth_callback_confirmed: false,
  },
  accessToken: {
    pending: false,
    oauth_token: '',
    oauth_token_secret: '',
  },
};

const authReducer = createReducer(initialState)
  .handleAction(requestToken.request, state =>
    produce(state, draft => {
      draft.requestToken.pending = true;
    })
  )
  .handleAction(requestToken.success, (state, { payload }) =>
    produce(state, draft => {
      draft.requestToken.pending = false;
      draft.requestToken.oauth_token = payload.oauth_token;
      draft.requestToken.oauth_token_secret = payload.oauth_token_secret;
      draft.requestToken.oauth_callback_confirmed =
        payload.oauth_callback_confirmed;
    })
  )
  .handleAction(requestToken.failure, state =>
    produce(state, draft => {
      draft.requestToken.pending = false;
    })
  )
  .handleAction(accessToken.request, state =>
    produce(state, draft => {
      draft.accessToken.pending = true;
    })
  )
  .handleAction(accessToken.success, (state, { payload }) =>
    produce(state, draft => {
      draft.accessToken.pending = false;
      draft.requestToken.oauth_token = payload.oauth_token;
      draft.requestToken.oauth_token_secret = payload.oauth_token_secret;
    })
  )
  .handleAction(accessToken.failure, state =>
    produce(state, draft => {
      draft.accessToken.pending = false;
    })
  );

export default authReducer;
