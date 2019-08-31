import React, { useCallback } from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  NavigationContainerComponent,
} from 'react-navigation';
import { ThemeProvider } from 'styled-components/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import HomeScreen from '@screen/home';
import LoginScreen from '@screen/login';
import SplashScreen from '@screen/splash';
import Authenticate from '@screen/authenticate';

import { defaultTheme } from './theme/default';
import store, { persistor } from './createStore';
import { setTopLevelNavigator } from '@utils/navigationService';

const AppStack = createStackNavigator({
  Home: HomeScreen,
});
const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Authenticate: Authenticate,
});

const Main = createSwitchNavigator(
  {
    Splash: SplashScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Splash',
  }
);

const App = createAppContainer(Main);

export default () => {
  const setRef = useCallback((node: NavigationContainerComponent) => {
    if (node) {
      setTopLevelNavigator(node);
    }
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={defaultTheme}>
          <App ref={setRef} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};
