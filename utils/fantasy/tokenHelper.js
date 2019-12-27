import Store from 'react-native-simple-store';
import * as FantasyTokenService from '../../api/yahoo_fantasy';
import reactotron from 'reactotron-react-native';
import moment from 'moment';

export const refreshToken = refresh_token => {
  return new Promise((resolve, reject) => {
    FantasyTokenService.refreshToken(refresh_token)
      .then(newToken => {
        Store.update('yahoo_token', {
          access_token: newToken.access_token,
          refresh_token: newToken.refresh_token,
          time_generated: moment(),
        }).then(() => {
          resolve(newToken);
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};
