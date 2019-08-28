/**
 * Timeline Component
 */
import React from 'react';
import { FlatList, Text } from 'react-native';

const Timeline = () => {
  return (
    <FlatList
      data={[{ key: 'a' }, { key: 'b' }]}
      renderItem={({ item }) => <Text>{item.key}</Text>}
    />
  );
};

export default Timeline;
