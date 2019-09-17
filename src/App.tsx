import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer,
  NavigationContainerComponent,
  NavigationNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ThemeProvider } from 'styled-components/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import LoginScreen from '@screen/login';
import SplashScreen from '@screen/splash';
import Authenticate from '@screen/authenticate';
import HomeScreen from '@screen/home';
import TweetScreen from '@screen/tweet';

import { defaultTheme } from './theme/default';
import store, { persistor } from './createStore';
import { setTopLevelNavigator } from '@utils/navigationService';
import dimensionContext from '@utils/dimensionContext';

const DimensionProvider = dimensionContext.Provider;

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Tweet: TweetScreen,
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

const App = createAppContainer(Main as NavigationNavigator<any, any>);

export default () => {
  const setRef = useCallback((node: NavigationContainerComponent) => {
    if (node) {
      setTopLevelNavigator(node);
    }
  }, []);
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const updateDimension = ({
    window,
  }: {
    window: ScaledSize;
    screen: ScaledSize;
  }) => {
    setDimension(window);
  };
  useEffect(() => {
    Dimensions.addEventListener('change', updateDimension);
    return () => {
      Dimensions.removeEventListener('change', updateDimension);
    };
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={defaultTheme}>
          <DimensionProvider value={dimension}>
            <App ref={setRef} />
          </DimensionProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};
