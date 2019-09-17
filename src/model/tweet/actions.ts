import { createAsyncAction } from 'typesafe-actions';
import { Tweet } from 'twitter';
import { TweetFetchParams } from './service';

export const tweet = createAsyncAction(
  'FETCH_TWEET',
  'FETCH_TWEET_SUCCESS',
  'FETCH_TWEET_FAILURE'
)<TweetFetchParams, Tweet, Error>();
