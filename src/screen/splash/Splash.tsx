import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenComponent } from 'react-navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@src/rootReducer';

const Splash: NavigationScreenComponent = props => {
  const user_id = useSelector<RootState, string>(
    state => state.auth.accessToken.user_id
  );
  if (!user_id) {
    props.navigation.navigate('Auth');
  } else {
    props.navigation.navigate('Home');
  }
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
