import React from 'react';
import {View, StatusBar} from 'react-native';
import LottieView from 'lottie-react-native';
import * as theme from '../../Theme';

const Preloader = props => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.darkBackground,
      }}>
      <StatusBar backgroundColor={theme.darkBackground} />
      <LottieView
        style={{width: 250, height: 250}}
        source={require('../../assets/animations/loader.json')}
        autoPlay
        loop
      />
    </View>
  );
};

Preloader.propTypes = {};

export default Preloader;
