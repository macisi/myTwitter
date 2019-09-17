import { getData } from '@utils/request';
import { Tweet } from 'twitter';

export interface TweetFetchParams {
  /**
   * The numerical ID of the desired Tweet.
   */
  id: string;
  /**
   * When true
   * each Tweet returned in a timeline will include a user object
   * including only the status authors numerical ID.
   * Omit this parameter to receive the complete user object.
   */
  trim_user?: boolean;
  /**
   * When true
   * any Tweets returned that have been retweeted by the
   * authenticating user will include an additional current_user_retweet node,
   * containing the ID of the source status for the retweet.
   */
  include_my_retweet?: boolean;
  /**
   * The entities node will not be included when set to false.
   */
  include_entities?: boolean;
  /**
   * If alt text has been added to any attached media entities,
   * this parameter will return an ext_alt_text value in the top-level key for the media entity.
   * If no value has been set, this will be returned as `null`
   */
  include_ext_alt_text?: boolean;
  /**
   * When true, the retrieved Tweet will include a card_uri attribute
   * when there is an ads card attached to the Tweet
   * and when that card was attached using the card_uri value.
   */
  include_card_uri?: boolean;
}

export const getTweetById = (
  oauth_token: string,
  oauth_token_secret: string,
  params: TweetFetchParams
) =>
  getData<Tweet>(
    {
      oauth_token,
      oauth_token_secret,
    },
    '/1.1/statuses/show.json',
    params
  );
