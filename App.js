import React from 'reactn';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Tabs from './screens/Tabs/Tabs';
import GameDetails from './screens/GameDetails/GameDetails';
import Player from './screens/Player/Player';
import Team from './screens/Team/Team';
import Calendar from './screens/Calendar/Calendar';
import Search from './screens/Search/Search';
import Login from './screens/Login/Login';
import Fantasy from './screens/Fantasy/Fantasy';
import TeamSchedule from './screens/TeamSchedule/TeamSchedule';
import {fromRight} from 'react-navigation-transitions';
import PreGame from './screens/PreGame/PreGame';
import firebase from 'react-native-firebase';
import reactotron from 'reactotron-react-native';
import Store from 'react-native-simple-store';
import {twitterAuth} from './api/twitter';
import Article from './screens/Article/Article';
import {getGeneralDetails} from './api/data.nba';
import * as theme from './Theme';
import Loading from './components/Loading/Loading';
import Preloader from './components/Preloader/Preloader';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  oAuthTwitter() {
    twitterAuth.then(data => {
      Store.update('twitterToken', data.access_token);
    });
  }

  async componentDidMount() {
    this.oAuthTwitter();
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      const channel = new firebase.notifications.Android.Channel(
        'game_channel',
        'Games Channel',
        firebase.notifications.Android.Importance.Max,
      );
      firebase.notifications().android.createChannel(channel);
      this.removeNotificationDisplayedListener = firebase
        .notifications()
        .onNotificationDisplayed((notification: Notification) => {
          // Process your notification as required
          // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
          reactotron.log('onNotificationDisplayed');
          reactotron.log(notification);
        });
      this.removeNotificationOpenedListener = firebase
        .notifications()
        .onNotificationOpened((notificationOpen: NotificationOpen) => {
          // Get the action triggered by the notification being opened
          reactotron.log('Opened Notification');
          // const action = notificationOpen.action;
          // Get information about the notification that was opened
          // const notification: Notification = notificationOpen.notification;
        });
      firebase
        .notifications()
        .getInitialNotification()
        .then((notificationOpen: NotificationOpen) => {
          if (notificationOpen) {
            // reactotron.log('Opened notification in background');
            // App was opened by a notification
            // Get the action triggered by the notification being opened
            // const action = notificationOpen.action;
            // Get information about the notification that was opened
            // const notification: Notification = notificationOpen.notification;
          }
        });
    } else {
      reactotron.log('Messaging is still disabled');
    }
    getGeneralDetails().then(({data}) => {
      this.setGlobal({
        seasonYear: data.seasonScheduleYear,
      });
      this.setState({loading: false});
    });
  }

  componentWillUnmount() {
    this.removeNotificationDisplayedListener();
    this.removeNotificationOpenedListener();
  }

  render() {
    if (this.state.loading) {
      return <Preloader />;
    }
    return <Fastbreak />;
  }
}

const MainNavigator = createStackNavigator(
  {
    Tabs: {
      screen: Tabs,
      navigationOptions: {
        header: null,
      },
    },
    GameDetails: {
      screen: GameDetails,
    },
    PreGame: {
      screen: PreGame,
    },
    Player: {
      screen: Player,
    },
    Team: {
      screen: Team,
    },
    Calendar: {
      screen: Calendar,
    },
    Article: {
      screen: Article,
    },
    Search: {
      screen: Search,
      navigationOptions: {
        header: null,
      },
    },
    TeamSchedule: {
      screen: TeamSchedule,
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    FantasyTabs: {
      screen: Fantasy,
    },
  },
  {
    headerLayoutPreset: 'center',
    initialRouteName: 'Tabs',
    transitionConfig: () => fromRight(),
  },
);

const Fastbreak = createAppContainer(MainNavigator);
