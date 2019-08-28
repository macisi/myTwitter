import React, { useEffect } from 'react';
import { NavigationScreenComponent } from 'react-navigation';
import styled from '@src/styled-components';
import Timeline from '@components/Timeline';
import { useDispatch } from 'react-redux';

import { homeTimeline } from '@model/home/actions';

const HomeView = styled.View`
  background-color: ${props => props.theme.primaryColor};
`;

const Home: NavigationScreenComponent = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(homeTimeline.request());
    return () => {};
  }, [dispatch]);

  return (
    <HomeView>
      <Timeline />
    </HomeView>
  );
};

export default Home;
