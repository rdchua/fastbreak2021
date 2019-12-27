import {Linking} from 'react-native';
import base64 from 'react-native-base64';
import reactotron from 'reactotron-react-native';
const client_id =
  'dj0yJmk9WHV5RkZPUklBaE0wJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTc0';
const client_secret = '3f7a7defdcd82ee75dcfea328d16c2876e55eb78';
/**
 * OAuth for Yahoo Fantasy sports (see documentation for steps)
 * Stores token to local storage of the device
 * ! Implement a refresh token as the token expires every hour
 */
export const oAuthYahooFantasy = () => {
  return fetch(
    `https://api.login.yahoo.com/oauth2/request_auth?client_id=${client_id}&redirect_uri=http://fastbreak-nba.herokuapp.com&response_type=code&language=en-us`,
  ).catch(err => {
    console.log(err);
  });
};

export const getToken = code => {
  reactotron.display({name: 'code', value: code});
  return fetch('https://api.login.yahoo.com/oauth2/get_token', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        base64.encode(`${encodeURI(client_id)}:${encodeURI(client_secret)}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=authorization_code&redirect_uri=http://fastbreak-nba.herokuapp.com&code=${code}`,
  }).then(response => response.json());
};

export const refreshToken = refresh_token => {
  return fetch(`https://api.login.yahoo.com/oauth2/get_token`, {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        base64.encode(`${encodeURI(client_id)}:${encodeURI(client_secret)}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=refresh_token&redirect_uri=http://fastbreak-nba.herokuapp.com&refresh_token=${refresh_token}`,
  }).then(response => response.json());
};
