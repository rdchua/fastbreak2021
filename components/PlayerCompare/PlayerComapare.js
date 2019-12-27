import React, {Component, PureComponent} from 'react';
import {styles} from './PlayerCompare.styles';
import {headshot} from '../../api/data.nba';
import {View, Image} from 'react-native';
import AnimatedText from '../AnimatedText/AnimatedText';
export default class PlayerComapare extends PureComponent {
  render() {
    const {
      homePlayer,
      awayPlayer,
      homeValue,
      awayValue,
      homeTeam,
      awayTeam,
      label,
    } = this.props;
    return (
      <View style={styles.row}>
        <View style={[styles.row, {flex: 1}]}>
          <Image
            source={{uri: headshot(awayPlayer.personId)}}
            style={[styles.headshot, {backgroundColor: awayTeam.primaryColor}]}
          />
          <View style={styles.leaderInfo}>
            <AnimatedText style={styles.playerName}>
              {awayPlayer.firstName} {awayPlayer.lastName}
            </AnimatedText>
            <AnimatedText style={styles.playerValue}>
              {awayValue}{' '}
              <AnimatedText style={styles.label}>{label}</AnimatedText>
            </AnimatedText>
          </View>
        </View>
        <View style={[styles.row, {flex: 1, justifyContent: 'flex-end'}]}>
          <View style={[styles.leaderInfo, {marginRight: 10}]}>
            <AnimatedText style={styles.playerName}>
              {homePlayer.firstName} {homePlayer.lastName}
            </AnimatedText>
            <AnimatedText style={[styles.playerValue, {textAlign: 'right'}]}>
              {homeValue}{' '}
              <AnimatedText style={styles.label}>{label}</AnimatedText>
            </AnimatedText>
          </View>
          <Image
            source={{uri: headshot(homePlayer.personId)}}
            style={[styles.headshot, {backgroundColor: homeTeam.primaryColor}]}
          />
        </View>
      </View>
    );
  }
}
