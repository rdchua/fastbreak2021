import React, {Component, PureComponent} from 'react';
import {View} from 'react-native';
import {styles} from './Empty.styles';
import AnimatedText from '../AnimatedText/AnimatedText';
export default class Empty extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <AnimatedText weight={500} style={styles.text}>
          {this.props.text}
        </AnimatedText>
      </View>
    );
  }
}
