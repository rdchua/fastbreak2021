import React, {Component, PureComponent} from 'react';
import {View} from 'react-native';
import {styles} from './StatsNbaAvg.styles';
import AnimatedText from '../AnimatedText/AnimatedText';
import DeviceInfo from 'react-native-device-info';
const fontScale = DeviceInfo.getFontScaleSync();
const NORMAL_WIDTH = {width: 43 * fontScale};
const PERCENT_WIDTH = {width: 60 * fontScale};

export default class StatsNbaTeam extends PureComponent {
  render() {
    const {stats} = this.props;
    return (
      <View style={styles.row}>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[26]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[18]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[19]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[21]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[22]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, PERCENT_WIDTH]}>
          {(stats[9] * 100).toFixed(1)}%
        </AnimatedText>
        <AnimatedText style={[styles.stat, PERCENT_WIDTH]}>
          {(stats[12] * 100).toFixed(1)}%
        </AnimatedText>
        <AnimatedText style={[styles.stat, PERCENT_WIDTH]}>
          {(stats[15] * 100).toFixed(1)}%
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[16]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[17]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[20]}
        </AnimatedText>
      </View>
    );
  }
}
