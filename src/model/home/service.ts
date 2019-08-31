import { getData } from '@utils/request';
import { Timeline } from 'twitter';

export const fetchHomeTimeline = (
  oauth_token: string,
  oauth_token_secret: string
) => {
  return getData<Timeline[]>(
    {
      oauth_token,
      oauth_token_secret,
    },
    '/1.1/statuses/home_timeline.json'
  );
};
