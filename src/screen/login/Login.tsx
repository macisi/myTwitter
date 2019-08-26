import React, { useCallback } from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationScreenComponent } from 'react-navigation';
import { RootState } from '@src/rootReducer';
import { requestToken } from '@model/auth/actions';

const Login: NavigationScreenComponent = props => {
  const dispatch = useDispatch();
  const getRequestToken = useCallback(() => dispatch(requestToken.request()), [
    dispatch,
  ]);
  const token = useSelector<RootState, string>(
    state => state.auth.requestToken.oauth_token
  );

  return (
    <View>
      <Button title="login" onPress={getRequestToken} />
      <Text>{token}</Text>
    </View>
  );
};

Login.navigationOptions = {
  title: 'Login Page',
};

export default Login;
