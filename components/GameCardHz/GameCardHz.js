import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {styles} from './GameCardHz.styles';
import {getTeamImage, getTeamDetails} from './../../utils/helper';
import AnimatedText from '../AnimatedText/AnimatedText';
import moment from 'moment';
import * as theme from './../../Theme';

export default class GameCardHz extends Component {
  renderTime = () => {
    const {game} = this.props;
    const startTime = moment(game.startTimeUTC).format('hh:mm A');
    const fromNow = moment(game.startTimeUTC).fromNow();
    if (game.statusNum === 1) {
      return (
        <AnimatedText style={styles.gameClock}>
          {startTime}, {fromNow}
        </AnimatedText>
      );
    } else if (game.statusNum === 2) {
      if (game.period.isHalfTime) {
        return <AnimatedText style={styles.gameClock}>HALF</AnimatedText>;
      } else if (game.period.isEndOfPeriod) {
        return (
          // eslint-disable-next-line prettier/prettier
          <AnimatedText
            style={
              styles.gameClock
            }>{`END OF Q${game.period.current}`}</AnimatedText>
        );
      }
      return (
        <View style={styles.row}>
          <View style={styles.redCircle} />
          <AnimatedText style={styles.gameClock}>
            {game.period.current > 4
              ? `OT ${game.period.current % 4}`
              : `Q${game.period.current} ${game.clock}`}
          </AnimatedText>
        </View>
      );
    } else if (game.statusNum === 3) {
      return (
        <AnimatedText style={styles.gameClock}>
          {game.period.current > 4
            ? `FINAL OT ${game.period.current % 4}`
            : 'FINAL'}
        </AnimatedText>
      );
    }
  };

  getBroadcast = () => {
    const {game} = this.props;
    return game.watch.broadcast.broadcasters.national.length > 0
      ? game.watch.broadcast.broadcasters.national[0].shortName
      : null;
  };

  render() {
    const {game} = this.props;
    const homeTeam = getTeamDetails(game.hTeam.teamId);
    const awayTeam = getTeamDetails(game.vTeam.teamId);
    const homeTeamImage = getTeamImage(homeTeam.triCode);
    const awayTeamImage = getTeamImage(awayTeam.triCode);
    const homeTeamStanding = `${game.hTeam.win} - ${game.hTeam.loss}`;
    const awayTeamStanding = `${game.vTeam.win} - ${game.vTeam.loss}`;
    const homeTeamScore = game.hTeam.score;
    const awayTeamScore = game.vTeam.score;
    return (
      <View style={styles.container}>
        <View style={[styles.row, styles.header]}>
          {this.renderTime()}
          <AnimatedText style={styles.broadcast}>
            {this.getBroadcast()}
          </AnimatedText>
        </View>
        <View>
          {/* home team */}
          <View style={styles.row}>
            <Image source={homeTeamImage} style={styles.teamImage} />
            <View style={styles.teamInfo}>
              <AnimatedText style={styles.teamName}>
                {homeTeam.altCityName} {homeTeam.nickName}
              </AnimatedText>
              <AnimatedText style={styles.teamStanding}>
                {homeTeamStanding}
              </AnimatedText>
            </View>
            <AnimatedText
              style={[
                styles.score,
                {
                  color:
                    homeTeamScore > awayTeamScore
                      ? theme.textPrimary
                      : theme.textTertiary,
                },
              ]}>
              {homeTeamScore}
            </AnimatedText>
          </View>
          {/* away team */}
          <View style={[styles.row, {marginTop: 10}]}>
            <Image source={awayTeamImage} style={styles.teamImage} />
            <View style={styles.teamInfo}>
              <AnimatedText style={styles.teamName}>
                {awayTeam.altCityName} {awayTeam.nickName}
              </AnimatedText>
              <AnimatedText style={styles.teamStanding}>
                {awayTeamStanding}
              </AnimatedText>
            </View>
            <AnimatedText
              style={[
                styles.score,
                {
                  color:
                    awayTeamScore > homeTeamScore
                      ? theme.textPrimary
                      : theme.textTertiary,
                },
              ]}>
              {awayTeamScore}
            </AnimatedText>
          </View>
        </View>
        {game.nugget.text !== '' ? (
          <AnimatedText style={styles.nugget}>{game.nugget.text}</AnimatedText>
        ) : null}
      </View>
    );
  }
}
