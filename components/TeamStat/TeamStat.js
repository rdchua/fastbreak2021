/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import AnimatedText from '../AnimatedText/AnimatedText';
import {styles} from './TeamStat.styles';
import reactotron from 'reactotron-react-native';
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
      <View style={styles.teamStatsContainer}>
        <View style={styles.teamStatBarContainer}>
          <View style={styles.statValueRow}>
            <AnimatedText style={styles.teamStatHome}>
              {this.printValue(props.awayTeamStat, props.awayTeamStat2)}
            </AnimatedText>
            <AnimatedText style={styles.teamStatName}>
              {props.name.toUpperCase()}
            </AnimatedText>
            <AnimatedText style={styles.teamStatVisitor}>
              {this.printValue(props.homeTeamStat, props.homeTeamStat2)}
            </AnimatedText>
          </View>
          <View style={{flexDirection: 'row', marginTop: 7}}>
            <View
              style={{
                width: this.calculateBarProgress(
                  props.awayTeamStat,
                  props.homeTeamStat,
                ),
                height: 5,
                borderRadius: 100,
                backgroundColor: props.homeTeamColor,
              }}
            />
            <View style={{marginHorizontal: 5}} />
            <View
              style={{
                width: this.calculateBarProgress(
                  props.homeTeamStat,
                  props.awayTeamStat,
                ),
                height: 5,
                borderRadius: 100,
                backgroundColor: props.awayTeamColor,
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
