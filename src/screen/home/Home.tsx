import React, { useEffect, useCallback } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import styled from '@src/styled-components';
import Timeline from '@components/Timeline';
import { RootState } from '@src/rootReducer';
import { compose, lensIndex, view, prop } from 'ramda';
import { useFetch } from '@utils/hooks';
import { TIMELINE_REQUEST_TYPE } from '@utils/enum';
import { Tweet } from 'twitter';
import { createSelector } from 'reselect';
import bigInt from 'big-integer';

import { homeTimeline } from '@model/home/actions';

const HomeView = styled.View``;

const getId = prop('id_str');
const getMaxId = compose(
  (v: string) =>
    bigInt(v)
      .subtract(1)
      .toString(),
  getId,
  view<Tweet[], Tweet>(lensIndex(-1))
);
const getSinceId = compose(
  getId,
  view<Tweet[], Tweet>(lensIndex(0))
);
type TimelineResult = {
  max_id: string;
  since_id: string;
  data: Tweet[];
  pending: boolean;
};

const timelineSelector = (s: RootState) => s.home.timeline;
const fetchTimelineSelector = createSelector<
  RootState,
  RootState['home']['timeline'],
  TimelineResult
>(
  timelineSelector,
  s => ({
    pending: s.pending,
    data: s.data,
    max_id: getMaxId(s.data),
    since_id: getSinceId(s.data),
  })
);

interface HomeProps extends NavigationInjectedProps<{}> {}

const Home: React.SFC<HomeProps> = () => {
  const { pending, fetch, result } = useFetch(
    fetchTimelineSelector,
    homeTimeline.request
  );
  useEffect(() => {
    if (result.data.length === 0) {
      fetch({
        type: TIMELINE_REQUEST_TYPE.TOP,
      });
    }
  }, [fetch, result]);
  const handleRefresh = useCallback(() => {
    console.log('handleRefresh', result.since_id);
    fetch({
      type: TIMELINE_REQUEST_TYPE.TOP,
      since_id: result.since_id,
    });
  }, [result.since_id, fetch]);
  const handleEndReached = useCallback(() => {
    console.log('handleEndReached', result.max_id);
    fetch({
      type: TIMELINE_REQUEST_TYPE.BOTTOM,
      max_id: result.max_id,
    });
  }, [result.max_id, fetch]);

  return (
    <HomeView>
      <Timeline
        data={result.data}
        onRefresh={handleRefresh}
        onEndReached={handleEndReached}
        refreshing={pending}
      />
    </HomeView>
  );
};

export default Home;
