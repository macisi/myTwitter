import React from 'react';
import { Button } from 'react-native';
import { NavigationScreenComponent } from 'react-navigation';
import styled from '@src/styled-components';

const HomeView = styled.View`
  background-color: ${props => props.theme.primaryColor};
`;

const Home: NavigationScreenComponent = props => (
  <HomeView>
    <Button title="twitter" onPress={() => console.log(123)} />
  </HomeView>
);

export default Home;
