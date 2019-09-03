/**
 * Tweet Card
 */
import React from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import { formatRelativeWithOptions } from 'date-fns/fp';
import { zhCN } from 'date-fns/locale';
import { compose, ifElse, propEq, view, lensPath } from 'ramda';
import styled from 'styled-components/native';
import Avatar from '@components/Avatar';
import { Tweet } from 'twitter';

interface TweetCardProps {
  item: Tweet;
}

const CardView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const TweetMeta = styled.View`
  display: flex;
  height: 50;
  flex-direction: row;
`;
const ContentView = styled.View`
  width: 100%;
`;

const avatarSourceView = view<TweetCardProps, string>(
  lensPath(['item', 'user', 'profile_image_url_https'])
);
const nameView = view<TweetCardProps, string>(
  lensPath(['item', 'user', 'name'])
);
const screenNameView = view<TweetCardProps, string>(
  lensPath(['item', 'user', 'screen_name'])
);
const when = compose(
  formatRelativeWithOptions({
    locale: zhCN,
  })(new Date()),
  str => new Date(str),
  view<TweetCardProps, string>(lensPath(['item', 'created_at']))
);
const textView = ifElse(
  propEq('truncated', true),
  view<TweetCardProps, string>(
    lensPath(['item', 'extended_tweet', 'full_text'])
  ),
  view<TweetCardProps, string>(lensPath(['item', 'text']))
);

const TweetCard = (props: TweetCardProps) => {
  const uri = avatarSourceView(props);
  return (
    <TouchableHighlight>
      <View>
        <CardView>
          <Avatar
            size={50}
            source={{
              uri,
            }}
          />
          <TweetMeta>
            <Text>{nameView(props)}</Text>
            <Text>@{screenNameView(props)}</Text>
            <Text>{when(props)}</Text>
          </TweetMeta>
          <ContentView>
            <Text>{textView(props)}</Text>
          </ContentView>
        </CardView>
      </View>
    </TouchableHighlight>
  );
};

export default TweetCard;
