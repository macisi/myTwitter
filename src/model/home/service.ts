import { getData } from '@utils/request';

export const fetchHomeTimeline = (
  oauth_token: string,
  oauth_token_secret: string
) => {
  return getData(
    oauth_token,
    oauth_token_secret,
    '/1.1/statuses/home_timeline.json'
  );
};
