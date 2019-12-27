import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {styles} from './GameCard.styles';
import {getTeamImage, getTeamDetails} from './../../utils/helper';
import AnimatedText from '../AnimatedText/AnimatedText';
import moment from 'moment';
import Card from '../../components/Card/Card';

export default class GameCard extends Component {
  renderScore = score => {
    const {game} = this.props;
    return game.statusNum !== 1 ? (
      <AnimatedText style={styles.score}>{score}</AnimatedText>
    ) : null;
  };

  renderTime = () => {
    const {game} = this.props;
    const startTime = moment(game.startTimeUTC).format('hh:mm');
    const startTimeA = moment(game.startTimeUTC).format('A');
    if (game.statusNum === 1) {
      return (
        <View>
          <AnimatedText style={styles.startTime}>
            {startTime}
            <AnimatedText style={styles.startTimeA}>{startTimeA}</AnimatedText>
          </AnimatedText>
          <AnimatedText style={styles.date}>TODAY</AnimatedText>
        </View>
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
        <AnimatedText style={styles.gameClock}>
          {game.period.current > 4
            ? `OT ${game.period.current % 4}`
            : `${game.period.current} ${game.clock}`}
        </AnimatedText>
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

  getStatus = () => {
    const {game} = this.props;
    return game.statusNum === 2 ? 'Live' : null;
  };

  getBroadcast = () => {
    const {game} = this.props;
    return game.watch.broadcast.broadcasters.national.length > 0
      ? game.watch.broadcast.broadcasters.national[0].shortName
      : null;
  };

  handleGamePress = () => {
    this.props.navigation.navigate('GameDetails');
  };

  render() {
    const {game} = this.props;
    const homeTeamImage = getTeamImage(game.hTeam.triCode);
    const awayTeamImage = getTeamImage(game.vTeam.triCode);
    const homeTeam = getTeamDetails(game.hTeam.teamId);
    const awayTeam = getTeamDetails(game.vTeam.teamId);
    const homeTeamStanding = `${game.hTeam.win} - ${game.hTeam.loss}`;
    const awayTeamStanding = `${game.vTeam.win} - ${game.vTeam.loss}`;
    const homeTeamScore = game.hTeam.score;
    const awayTeamScore = game.vTeam.score;
    return (
      <Card style={styles.container}>
        <View style={[styles.row, styles.game]}>
          <View style={[styles.row, styles.teamContainer]}>
            <View>
              <Image source={homeTeamImage} style={styles.teamImage} />
              <AnimatedText style={styles.teamName}>
                {homeTeam.nickName}
              </AnimatedText>
              <AnimatedText style={styles.teamRecord}>
                ({homeTeamStanding})
              </AnimatedText>
            </View>
            {this.renderScore(homeTeamScore)}
          </View>
          <View style={[styles.row, styles.timeContainer]}>
            {this.renderTime()}
          </View>
          <View style={[styles.row, styles.teamContainer, styles.awayTeam]}>
            {this.renderScore(awayTeamScore)}
            <View>
              <Image source={awayTeamImage} style={styles.teamImage} />
              <AnimatedText style={styles.teamName}>
                {awayTeam.nickName}
              </AnimatedText>
              <AnimatedText style={styles.teamRecord}>
                ({awayTeamStanding})
              </AnimatedText>
            </View>
          </View>
        </View>
        {game.nugget.text === '' ? null : (
          <AnimatedText style={styles.nugget}>{game.nugget.text}</AnimatedText>
        )}
      </Card>
    );
  }
}
