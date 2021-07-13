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
    const {stats, title} = this.props;
    return (
      <View style={styles.row}>
        <AnimatedText style={[styles.stat, styles.title]}>
          {title}-{parseInt(title) + 1}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats.mpg}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats.ppg}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats.rpg}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats.apg}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats.spg}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats.bpg}
        </AnimatedText>
        <AnimatedText style={[styles.stat, PERCENT_WIDTH]}>
          {stats.fgm}/{stats.fga}
        </AnimatedText>
        <AnimatedText style={[styles.stat, PERCENT_WIDTH]}>
          {stats.fgp}%
        </AnimatedText>
        <AnimatedText style={[styles.stat, PERCENT_WIDTH]}>
          {stats.tpm}/{stats.tpa}
        </AnimatedText>
        <AnimatedText style={[styles.stat, PERCENT_WIDTH]}>
          {((stats.tpm / stats.tpa) * 100).toFixed(1)}%
        </AnimatedText>
        <AnimatedText style={[styles.stat, PERCENT_WIDTH]}>
          {stats.ftm}/{stats.fta}
        </AnimatedText>
        <AnimatedText style={[styles.stat, PERCENT_WIDTH]}>
          {((stats.ftm / stats.fta) * 100).toFixed(1)}%
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats.offReb}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats.defReb}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats.topg}
        </AnimatedText>
      </View>
    );
  }
}
