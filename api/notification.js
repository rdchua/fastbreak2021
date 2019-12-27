import {ToastAndroid} from 'react-native';
import {firebase} from '@react-native-firebase/messaging';
import moment from 'moment';
import Store from 'react-native-simple-store';

const postHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const subscribeToGame = (token, data, notifType) => {
  return fetch('http://192.168.1.14:9000/api/subscribeUserToGame', {
    method: 'POST',
    headers: postHeaders,
    body: JSON.stringify({
      token: token,
      data: data,
      notifType: notifType,
    }),
  });
};

export const unsubscribeFromGame = (token, data, notifType) => {
  fetch(
    'https://evening-harbor-41076.herokuapp.com/api/unsubscribeUserFromGame',
    {
      method: 'POST',
      headers: postHeaders,
      body: JSON.stringify({
        token: token,
        data: data,
        notifType: notifType,
      }),
    },
  );
};

export function createStartGameNotification(gameInfo) {
  const notification = new firebase.notifications.Notification()
    .setNotificationId(`${gameInfo.gameId}-0`)
    .setTitle('Game is about to start')
    .setBody(`${gameInfo.vTeam.triCode} vs ${gameInfo.hTeam.triCode}`)
    .setData({
      gameId: gameInfo.gameId,
    })
    .android.setChannelId('game-start')
    .android.setSmallIcon('ic_notification');
  if (checkNotificationPermission()) {
    const date = moment(gameInfo.startTimeUTC)
      .toDate()
      .getTime();
    firebase.notifications().scheduleNotification(notification, {
      fireDate: date,
    });
    Store.push('notifs', `${gameInfo.gameId}-0`);
  } else {
    ToastAndroid.show(
      'Notifications has been disabled. Please allow notifications.',
      ToastAndroid.SHORT,
    );
  }
}

export function createChannel(channelName, channelTitle, channelDesc) {
  const channel = new firebase.notifications.Android.Channel(
    channelName,
    channelTitle,
    firebase.notifications.Android.Importance.Max,
  ).setDescription(channelDesc);
  firebase.notifications().android.createChannel(channel);
}

export function refreshFirebaseToken() {
  Store.get('fcmToken').then(token => {
    if (!token) {
      firebase
        .messaging()
        .getToken()
        .then(fcmToken => {
          if (fcmToken) {
            Store.save('fcmToken', fcmToken);
          }
        });
    }
  });
}

/**
 * Private functions
 */

function requestNotificationPermission() {
  return firebase
    .messaging()
    .requestPermission()
    .then(() => {
      return true;
    })
    .catch(error => {
      return false;
    });
}

function checkNotificationPermission() {
  return firebase
    .messaging()
    .hasPermission()
    .then(enabled => {
      if (enabled) {
        return true;
      } else {
        return requestNotificationPermission();
      }
    });
}
