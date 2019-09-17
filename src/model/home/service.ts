import { getData } from '@utils/request';
import { Tweet, TimelineParameters } from 'twitter';

export const fetchHomeTimeline = (
  oauth_token: string,
  oauth_token_secret: string,
  params: TimelineParameters
) =>
  getData<Tweet[]>(
    {
      oauth_token,
      oauth_token_secret,
    },
    '/1.1/statuses/home_timeline.json',
    params
  );
