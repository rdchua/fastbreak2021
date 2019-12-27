import React, {Component, PureComponent} from 'react';
import {ScrollView, View} from 'react-native';
import AnimatedText from '../AnimatedText/AnimatedText';
import {styles} from './Stats.nba.styles';
import DeviceInfo from 'react-native-device-info';
import reactotron from 'reactotron-react-native';
import moment from 'moment';
const fontScale = DeviceInfo.getFontScaleSync();
const NORMAL_WIDTH = {width: 43 * fontScale};
const PERCENT_WIDTH = {width: 65 * fontScale};

export default class StatsNba extends PureComponent {
  renderDate = (gameDate, game) => {
    const date = moment(gameDate, 'MMM DD, YYYY').format('MMM DD');
    if (game.includes('vs')) {
      return `${date} vs. ${game.split('vs.')[1]}`;
    } else if (game.includes('@')) {
      return `${date} @ ${game.split('@')[1]}`;
    }
  };

  render() {
    const {stats} = this.props;
    reactotron.log(stats);
    return (
      <View style={styles.row}>
        <AnimatedText style={[styles.stat, styles.title]}>
          {this.renderDate(stats[3], stats[4])}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[6]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[24]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[18]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[19]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[20]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[21]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, PERCENT_WIDTH]}>
          {stats[7]}/{stats[8]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, PERCENT_WIDTH]}>
          {(stats[9] * 100).toFixed(1)}%
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
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[16]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[17]}
        </AnimatedText>
        <AnimatedText style={[styles.stat, NORMAL_WIDTH]}>
          {stats[22]}
        </AnimatedText>
      </View>
    );
  }
}
