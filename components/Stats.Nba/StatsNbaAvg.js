import React, {Component, PureComponent} from 'react';
import {View} from 'react-native';
import {styles} from './StatsNbaAvg.styles';
import AnimatedText from '../AnimatedText/AnimatedText';
import DeviceInfo from 'react-native-device-info';
const fontScale = DeviceInfo.getFontScaleSync();
const NORMAL_WIDTH = {width: 43 * fontScale};
const PERCENT_WIDTH = {width: 65 * fontScale};

export default class StatsNbaAvg extends PureComponent {
  render() {
    const {stats} = this.props;
    return (
      <View style={styles.row}>
        <AnimatedText style={[styles.stat, styles.title]}>
          {stats[1]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[9]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[29]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[21]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[22]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[24]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[25]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, PERCENT_WIDTH]}>
          {stats[10]}/{stats[11]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, PERCENT_WIDTH]}>
          {(stats[12] * 100).toFixed(1)}%
        </AnimatedText>
        <AnimatedText style={[styles.stat, PERCENT_WIDTH]}>
          {stats[13]}/{stats[14]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, PERCENT_WIDTH]}>
          {(stats[15] * 100).toFixed(1)}%
        </AnimatedText>
        <AnimatedText style={[styles.stat, PERCENT_WIDTH]}>
          {stats[16]}/{stats[17]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, PERCENT_WIDTH]}>
          {(stats[18] * 100).toFixed(1)}%
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[19]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[20]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[23]}
        </AnimatedText>
      </View>
    );
  }
}
