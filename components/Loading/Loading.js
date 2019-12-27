import React, {Component} from 'react';
import {ActivityIndicator, View, StatusBar} from 'react-native';
import * as theme from './../../Theme';
export default class Loading extends Component {
  render() {
    const {size, backgroundColor, style} = this.props;
    return (
      <View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: backgroundColor,
          },
          style,
        ]}>
        <StatusBar backgroundColor={theme.darkPrimary} />
        <ActivityIndicator size={size ? size : 'large'} color="#fff" />
      </View>
    );
  }
}
