import React from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenComponent } from 'react-navigation';
import useMount from 'react-use/lib/useMount';
import { useSelector } from 'react-redux';
import { RootState } from '@src/rootReducer';

const Splash: NavigationScreenComponent = props => {
  const user_id = useSelector<RootState, string>(
    state => state.auth.accessToken.user_id
  );
  useMount(() => {
    if (!user_id) {
      props.navigation.navigate('Auth');
    } else {
      setTimeout(() => {
        props.navigation.navigate('Home');
      }, 100);
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
