import {
  generateOauthSignature,
  generateOauthNonce,
  generateAuthorizationHeader,
} from './helpers';

test('generate oauth nonce correctly', () => {
  const nonce = generateOauthNonce();

  expect(nonce).toEqual(expect.stringMatching(/^[a-z|A-Z|0-9]+$/));
});

test('generate oauth signature correctly', () => {
  const signature = generateOauthSignature(
    'POST',
    'https://api.twitter.com/1.1/statuses/update.json',
    {
      status: 'Hello Ladies + Gentlemen, a signed OAuth request!',
      include_entities: 'true',
      oauth_consumer_key: 'xvz1evFS4wEEPTGEFPHBog',
      oauth_nonce: 'kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg',
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: 1318622958,
      oauth_token: '370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb',
      oauth_version: '1.0',
    },
    'kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw',
    'LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE'
  );

  expect(signature).toBe('hCtSmYh+iHYCEqBWrE7C7hYmtUk=');
});

test('generate authorization header correctly', () => {
  const authHeader = generateAuthorizationHeader({
    oauth_consumer_key: 'xvz1evFS4wEEPTGEFPHBog',
    oauth_nonce: 'kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg',
    oauth_signature: 'tnnArxj06cWHq44gCs1OSKk/jLY=',
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: 1318622958,
    oauth_token: '370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb',
    oauth_version: '1.0',
  });

  expect(authHeader).toBe(
    'OAuth oauth_consumer_key="xvz1evFS4wEEPTGEFPHBog", oauth_nonce="kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg", oauth_signature="tnnArxj06cWHq44gCs1OSKk%2FjLY%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1318622958", oauth_token="370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb", oauth_version="1.0"'
  );
});

test('generate auth header with access_token correctly', () => {
  const oauth_signature = generateOauthSignature(
    'GET',
    'https://api.twitter.com/1.1/statuses/home_timeline.json',
    {
      oauth_consumer_key: process.env.CONSUMER_KEY as string,
      oauth_nonce: 'mW6kAO5VBN7',
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: 1566985528,
      oauth_token: process.env.ACCESS_TOKEN as string,
      oauth_version: '1.0',
    },
    process.env.CONSUMER_SECRET as string,
    process.env.ACCESS_TOKEN_SECRET as string
  );
  const authHeader = generateAuthorizationHeader({
    oauth_consumer_key: process.env.CONSUMER_KEY as string,
    oauth_token: process.env.ACCESS_TOKEN as string,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: 1566985528,
    oauth_nonce: 'mW6kAO5VBN7',
    oauth_version: '1.0',
    oauth_signature,
  });

  expect(authHeader).toBe(
    'OAuth oauth_consumer_key="NhPm8eTgY1xraW85DpriU95mg", oauth_token="143741659-n6DvoFwgj3zALAmIyXx1BvMd1dLMX2iLhEmXyu1N", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1566985528", oauth_nonce="mW6kAO5VBN7", oauth_version="1.0", oauth_signature="EbBi2idoM3KBsSYX3Nfureqc8SY%3D"'
  );
});
