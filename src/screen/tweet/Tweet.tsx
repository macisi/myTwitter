import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { UseFetchResult, useFetch } from '@utils/hooks';
import { createSelector } from 'reselect';
import TweetCard from '@components/TweetCard';
import { Tweet } from 'twitter';
import { path } from 'ramda';

import { tweet } from '@model/tweet/actions';
import { RootState } from 'types';

interface TweetProps
  extends NavigationInjectedProps<{
    id: string;
  }> {}

const getTweetSelector = () =>
  createSelector<
    RootState,
    string,
    RootState['tweet'],
    string,
    UseFetchResult<{
      tweet: Tweet | undefined;
    }>
  >(
    [s => s.tweet, (_, id) => id],
    (t, id) => ({
      tweet: path<Tweet>(['tweets', id])(t),
      pending: t.pending,
    })
  );

const TweetComponent: React.SFC<TweetProps> = props => {
  const { navigation } = props;
  const tweetId = navigation.getParam('id');
  const tweetSelector = useMemo(getTweetSelector, []);
  const { pending, fetch, result } = useFetch(
    tweetSelector,
    tweetId,
    tweet.request
  );
  useEffect(() => {
    if (!result.tweet) {
      fetch({
        id: tweetId,
      });
    }
  }, [fetch, result, tweetId]);
  return <View>{result.tweet && <TweetCard item={result.tweet} />}</View>;
};

export default TweetComponent;
