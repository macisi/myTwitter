/**
 * Timeline Component
 */
import React from 'react';
import { FlatList } from 'react-native';
import TweetCard from '@components/TweetCard';
import { Tweet } from 'twitter';

interface TimelineProps {
  data: Tweet[];
  onRefresh: () => void;
  onEndReached: (info: { distanceFromEnd: number }) => void;
  refreshing: boolean;
}

const Timeline = (props: TimelineProps) => {
  return (
    <FlatList
      data={props.data}
      renderItem={TweetCard}
      keyExtractor={item => item.id_str}
      onRefresh={props.onRefresh}
      onEndReached={props.onEndReached}
      refreshing={props.refreshing}
    />
  );
};

export default Timeline;
