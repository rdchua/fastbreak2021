import React, {Component} from 'react';
import {View, Image, StatusBar, TouchableOpacity, Linking} from 'react-native';
import {styles} from './Login.styles';
import {oAuthYahooFantasy, getToken} from '../../api/yahoo_fantasy';
import Store from 'react-native-simple-store';
import AnimatedText from '../../components/AnimatedText/AnimatedText';
import loginBg from '../../assets/images/loginbg.jpg';
import nbaLogo from '../../assets/images/fantasyLogo_white.png';
import reactotron from 'reactotron-react-native';
import moment from 'moment';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      teams: [],
      access_token: '',
      refresh_token: '',
      noToken: false,
    };
  }

  yahooLogin() {
    oAuthYahooFantasy().then(response => {
      reactotron.log(response);
      Linking.openURL(response.url);
      Linking.addEventListener('url', responseUrl => {
        getToken(responseUrl.url.split('code=')[1]).then(data => {
          console.log(data);
          Store.update('yahoo_token', {
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            time_generated: moment(),
          });
          this.props.navigation.goBack();
        });
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent />
        <Image source={loginBg} style={styles.imageBg} />
        <View style={styles.overlay}></View>
        <Image source={nbaLogo} style={styles.nbalogo} />
        <AnimatedText weight={700} style={styles.title}>
          Welcome to the NBA Fantasy league!
        </AnimatedText>
        <AnimatedText style={styles.subtitle}>
          Login to manage your team and players
        </AnimatedText>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.yahooLogin()}>
          <AnimatedText weight={700} style={styles.buttonText}>
            Sign in to Yahoo fantasy
          </AnimatedText>
        </TouchableOpacity>
      </View>
    );
  }
}
