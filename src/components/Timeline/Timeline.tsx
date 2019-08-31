/**
 * Timeline Component
 */
import React from 'react';
import { FlatList } from 'react-native';
import TweetCard from '@components/TweetCard';
import { Tweet } from 'twitter';

interface TimelineProps {
  data: Tweet[];
}

const Timeline = (props: TimelineProps) => {
  return (
    <FlatList
      data={props.data}
      keyExtractor={item => item.id_str}
      renderItem={TweetCard}
    />
  );
};

export default Timeline;
