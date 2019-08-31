import React, { useEffect } from 'react';
import { NavigationScreenComponent } from 'react-navigation';
import styled from '@src/styled-components';
import Timeline from '@components/Timeline';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/rootReducer';
import { Tweet } from 'twitter';

import { homeTimeline } from '@model/home/actions';

const HomeView = styled.View``;

const Home: NavigationScreenComponent = props => {
  const dispatch = useDispatch();
  const data = useSelector<RootState, Tweet[]>(
    state => state.home.timeline.data
  );
  useEffect(() => {
    if (data.length === 0) {
      dispatch(homeTimeline.request());
    }
  }, [dispatch, data]);

  return (
    <HomeView>
      <Timeline data={data} />
    </HomeView>
  );
};

export default Home;
