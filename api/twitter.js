const base_url = 'https://api.twitter.com';

const consumer_key = 'f6qT3CmduGTitCqSNZzIswJcg';
const consumer_secret = 'iZNpWzXMERb8wV0A0PESS4ZQquqlvxRaY0xv9ojGLYCPAIbLFr';
import base64 from 'react-native-base64';

export const authHeaders = {
  method: 'POST',
  headers: {
    Authorization:
      'Basic ' +
      base64.encode(`${encodeURI(consumer_key)}:${encodeURI(consumer_secret)}`),
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
  body: 'grant_type=client_credentials',
};
export const twitterHeaders = token => {
  return {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
};
export const oAuth = `${base_url}/oauth2/token`;
export const getTeamFeed = (twitterName, count) => {
  return `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${twitterName}&count=${count}`;
};
export const twitterAuth = fetch(oAuth, authHeaders).then(response =>
  response.json(),
);
