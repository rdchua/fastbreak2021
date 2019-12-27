import React, {Component, PureComponent} from 'react';
import {View} from 'react-native';
import {styles} from './StatsNbaHeader.styles';
import AnimatedText from '../AnimatedText/AnimatedText';
import DeviceInfo from 'react-native-device-info';
const fontScale = DeviceInfo.getFontScaleSync();
const NORMAL_WIDTH = {width: 43 * fontScale};
const PERCENT_WIDTH = {width: 60 * fontScale};
export default class StatsNbaTeamHeader extends PureComponent {
  render() {
    return (
      <View style={[styles.row, styles.header]}>
        <AnimatedText weight={600} style={[styles.header, NORMAL_WIDTH]}>
          PTS
        </AnimatedText>
        <AnimatedText weight={600} style={[styles.header, NORMAL_WIDTH]}>
          REB
        </AnimatedText>
        <AnimatedText weight={600} style={[styles.header, NORMAL_WIDTH]}>
          AST
        </AnimatedText>
        <AnimatedText weight={600} style={[styles.header, NORMAL_WIDTH]}>
          STL
        </AnimatedText>
        <AnimatedText weight={600} style={[styles.header, NORMAL_WIDTH]}>
          BLK
        </AnimatedText>
        <AnimatedText weight={600} style={[styles.header, PERCENT_WIDTH]}>
          FG%
        </AnimatedText>
        <AnimatedText weight={600} style={[styles.header, PERCENT_WIDTH]}>
          3P%
        </AnimatedText>
        <AnimatedText weight={600} style={[styles.header, PERCENT_WIDTH]}>
          FT%
        </AnimatedText>
        <AnimatedText weight={600} style={[styles.header, NORMAL_WIDTH]}>
          OREB
        </AnimatedText>
        <AnimatedText weight={600} style={[styles.header, NORMAL_WIDTH]}>
          DREB
        </AnimatedText>
        <AnimatedText weight={600} style={[styles.header, NORMAL_WIDTH]}>
          TO
        </AnimatedText>
      </View>
    );
  }
}
