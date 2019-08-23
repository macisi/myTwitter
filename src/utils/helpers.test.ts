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
