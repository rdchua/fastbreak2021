/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import AnimatedText from '../AnimatedText/AnimatedText';
import {styles} from './FantasyTeamStat.styles';
import {darkBackground} from '../../Theme';
export default class TeamStat extends Component {
  printValue = (stat, stat2) => {
    if (stat2) {
      return `${stat}/${stat2} (${(
        (parseInt(stat) / parseInt(stat2)) *
        100
      ).toFixed(1)}%)`;
    }
    return stat;
  };

  calculateBarProgress(thisTeam, otherTeam) {
    if (parseFloat(thisTeam) < 0) {
      thisTeam = parseFloat(thisTeam) * 100;
      otherTeam = parseFloat(otherTeam) * 100;
    }
    return `${(parseFloat(thisTeam) /
      (parseFloat(thisTeam) + parseFloat(otherTeam))) *
      100 *
      1}%`;
  }

  render() {
    const props = {...this.props};
    return (
      <View
        style={[
          styles.teamStatsContainer,
          {backgroundColor: props.index % 2 === 0 ? darkBackground : '#181818'},
        ]}>
        <View style={styles.teamStatBarContainer}>
          <View style={styles.statValueRow}>
            <AnimatedText
              style={[
                styles.teamStatHome,
                {
                  color:
                    props.awayTeamStat > props.homeTeamStat ? 'white' : 'gray',
                },
              ]}>
              {this.printValue(props.awayTeamStat, props.awayTeamStat2)}
            </AnimatedText>
            <AnimatedText style={styles.teamStatName}>
              {props.name.toUpperCase()}
            </AnimatedText>
            <AnimatedText
              style={[
                styles.teamStatHome,
                {
                  color:
                    props.homeTeamStat > props.awayTeamStat ? 'white' : 'gray',
                },
              ]}>
              {this.printValue(props.homeTeamStat, props.homeTeamStat2)}
            </AnimatedText>
          </View>
        </View>
      </View>
    );
  }
}
