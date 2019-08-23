import React from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenComponent } from 'react-navigation';
import useMount from 'react-use/lib/useMount';

const Splash: NavigationScreenComponent = props => {
  useMount(() => {
    if (true /* not logined */) {
      props.navigation.navigate('Auth');
    } else {
      setTimeout(() => {
        props.navigation.navigate('Home');
      }, 1000);
    }
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;
