/**
 * @format
 */
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './Globals';
// import timezone_mock from 'timezone-mock';
// import reactotron from 'reactotron-react-native';
// import moment from 'moment';
console.disableYellowBox = true;

// timezone_mock.register("");
// reactotron.log(moment().format('MM/DD/YYYY hh:mm a'));

AppRegistry.registerComponent(appName, () => App);
