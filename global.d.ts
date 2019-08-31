declare module 'react-native-dotenv' {
  interface Env {
    CONSUMER_KEY: string;
    CONSUMER_SECRET: string;
    OAUTH_CALLBACK: string;
    ACCESS_TOKEN: string;
    ACCESS_TOKEN_SECRET: string;
  }

  export const CONSUMER_KEY: Env['CONSUMER_KEY'];
  export const CONSUMER_SECRET: Env['CONSUMER_SECRET'];
  export const OAUTH_CALLBACK: Env['OAUTH_CALLBACK'];
  export const ACCESS_TOKEN: Env['ACCESS_TOKEN'];
  export const ACCESS_TOKEN_SECRET: Env['ACCESS_TOKEN_SECRET'];
}

interface OAuthToken {
  oauth_token: string;
  oauth_token_secret: string;
}

declare module 'twitter' {
  import {
    Coordinates,
    Entities,
    ExtendedEntities,
    Place,
    FullUser,
  } from 'twitter-d';

  interface Tweet {
    created_at: string;
    id: number;
    id_str: string;
    text: string;
    truncated: boolean;
    entities: Entities;
    extended_entities?: ExtendedEntities | null;
    source: string;
    in_reply_to_screen_name: string | null;
    in_reply_to_status_id_str: string | null;
    in_reply_to_status_id: number | null;
    in_reply_to_user_id_str: string | null;
    in_reply_to_user_id: number | null;
    geo: string | null;
    coordinates?: Coordinates | null;
    place?: Place | null;
    contributors: string | null;
    is_quote_status: boolean;
    retweet_count: number;
    favorite_count: number;
    favorited: boolean;
    retweeted: boolean;
    possibly_sensitive: boolean;
    possibly_sensitive_appealable: boolean;
    lang: string;
    user: FullUser;
  }
}
