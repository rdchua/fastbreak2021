import React, {Component, PureComponent} from 'react';
import {View, TouchableOpacity, Image, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {getTeamImage, getTeamDetails} from './../../utils/helper';
import {styles} from './Game.styles';
import AnimatedText from '../../components/AnimatedText/AnimatedText';
import reactotron from 'reactotron-react-native';
import Store from 'react-native-simple-store';
import * as theme from '../../Theme';
import moment from 'moment';
import firebase from 'react-native-firebase';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      caretAnimation: new Animated.Value(0),
      notificationOn: false,
    };
  }

  componentDidMount() {
    const {game} = this.props;
    Store.get('notifications').then(notifications => {
      const notificationOn = notifications.find(notification => {
        return notification === game.gameId;
      });
      if (notificationOn) {
        this.setState({notificationOn: true});
      }
    });
  }

  renderTeamName = (myScore, opponentScore, team, teamStanding, status) => {
    const win = parseInt(myScore) > parseInt(opponentScore);
    const color = win ? theme.textPrimary : theme.textSecondary;
    const weight = win ? 700 : 500;
    const {showStanding} = this.props;
    return (
      <AnimatedText
        numberOfLines={1}
        weight={weight}
        style={[styles.teamName, {color: color}]}>
        {`${team.triCode} ${team.nickName}`}{' '}
        <AnimatedText style={styles.standing}>
          {status === 1 && showStanding ? `(${teamStanding})` : null}
        </AnimatedText>
      </AnimatedText>
    );
  };

  renderCaret = (status, myScore, opponentScore) => {
    return parseInt(myScore) > parseInt(opponentScore) && status !== 1 ? (
      <Icon name="caretright" size={8} color="#1988F4" style={styles.caret} />
    ) : null;
  };

  renderScore = (status, myScore, opponentScore, isAway) => {
    const style = [
      parseInt(myScore) > parseInt(opponentScore)
        ? styles.teamScoreWinner
        : styles.teamScoreLoser,
      isAway ? styles.roundedCornerBottom : styles.roundedCornerTop,
    ];
    return status !== 1 ? (
      <AnimatedText style={style}>{myScore}</AnimatedText>
    ) : (
      <AnimatedText style={style}>-</AnimatedText>
    );
  };

  renderNotificationIcon = () => {
    const {game} = this.props;
    if (game.statusNum === 1) {
      return (
        <TouchableOpacity
          style={styles.notifIcon}
          onPress={() => this.createNotification()}>
          <Icon2
            name={this.state.notificationOn ? 'bell' : 'bell-o'}
            size={17}
            color={this.state.notificationOn ? '#FDD835' : 'gray'}
          />
        </TouchableOpacity>
      );
    }
  };

  renderTime = () => {
    const {game} = this.props;
    const style = [
      styles.gameClockValue,
      {color: game.statusNum === 2 ? '#CC2D40' : 'white'},
    ];
    const startTime = moment(game.startTimeUTC).format('hh:mm');
    const startTimeA = moment(game.startTimeUTC).format('a');
    if (game.statusNum === 1) {
      return (
        <AnimatedText style={style}>
          {startTime} {startTimeA}
        </AnimatedText>
      );
    } else if (game.statusNum === 2) {
      if (game.period.isHalfTime) {
        return (
          <AnimatedText weight={500} style={styles.live}>
            HALF
          </AnimatedText>
        );
      } else if (game.period.isEndOfPeriod) {
        return (
          // eslint-disable-next-line prettier/prettier
          <AnimatedText weight={500} style={styles.live}>{`END OF Q${
            game.period.current
          }`}</AnimatedText>
        );
      }
      return (
        <AnimatedText weight={500} style={styles.live}>
          {game.period.current > 4
            ? `${game.period.current % 4} OT - ${game.clock}`
            : `Q${game.period.current} - ${game.clock}`}
        </AnimatedText>
      );
    } else if (game.statusNum === 3) {
      return (
        <AnimatedText style={style}>
          {game.period.current > 4
            ? `FINAL ${game.period.current % 4} OT`
            : 'FINAL'}
        </AnimatedText>
      );
    }
  };

  getBroadcast = () => {
    const {game} = this.props;
    return game.watch.broadcast.broadcasters.national.length > 0
      ? game.watch.broadcast.broadcasters.national[0].shortName
      : 'N/A';
  };

  navigateToGameDetails() {
    const {game} = this.props;
    this.props.navigation.navigate('GameDetails', game);
  }

  createNotification() {
    const {game} = this.props;
    this.setState({notificationOn: !this.state.notificationOn}, () => {
      if (this.state.notificationOn) {
        reactotron.log(game.gameId);
        Store.push('notifications', game.gameId).then(() => {
          Store.get('notifications').then(notifs => {
            reactotron.log(notifs);
          });
        });
        const notification = new firebase.notifications.Notification()
          .setNotificationId(game.gameId)
          .setTitle('Game starts in 15 minutes')
          .setBody(`${game.vTeam.triCode} vs ${game.hTeam.triCode}`)
          .setData({gameId: game.gameId})
          .android.setChannelId('game_channel')
          .android.setSmallIcon('ic_notification');
        const date = moment.utc(game.startTimeUTC).toDate();
        date.setMinutes(date.getMinutes() - 15);
        firebase.notifications().scheduleNotification(notification, {
          fireDate: date.getTime(),
        });
      } else {
        this.deleteNotification(game.gameId);
      }
    });
  }

  deleteNotification(gameId) {
    Store.get('notifications').then(notifications => {
      const newNotifications = notifications.filter(notif => {
        return notif !== gameId;
      });
      Store.delete('notifications').then(() => {
        Store.save('notifications', newNotifications);
      });
    });
  }

  render() {
    const {game, style} = this.props;
    const homeTeamImage = getTeamImage(game.hTeam.triCode);
    const awayTeamImage = getTeamImage(game.vTeam.triCode);
    const homeTeam = getTeamDetails(game.hTeam.teamId);
    const awayTeam = getTeamDetails(game.vTeam.teamId);
    const homeTeamStanding = `${game.hTeam.win} - ${game.hTeam.loss}`;
    const awayTeamStanding = `${game.vTeam.win} - ${game.vTeam.loss}`;
    const homeTeamScore = game.hTeam.score;
    const awayTeamScore = game.vTeam.score;
    return (
      <Animated.View style={[styles.content, style]}>
        <View>
          <View style={styles.contentContainer}>
            <View style={styles.scores}>
              <View style={[styles.teamRow, {zIndex: 2}]}>
                <Image style={styles.teamImage} source={homeTeamImage} />
                {this.renderTeamName(
                  homeTeamScore,
                  awayTeamScore,
                  homeTeam,
                  homeTeamStanding,
                  game.statusNum,
                )}
                {this.renderCaret(game.statusNum, homeTeamScore, awayTeamScore)}
                {this.renderScore(
                  game.statusNum,
                  homeTeamScore,
                  awayTeamScore,
                  false,
                )}
              </View>
              <View style={[styles.teamRow, {marginTop: -15}]}>
                <Image style={styles.teamImage} source={awayTeamImage} />
                {this.renderTeamName(
                  awayTeamScore,
                  homeTeamScore,
                  awayTeam,
                  awayTeamStanding,
                  game.statusNum,
                )}
                {this.renderCaret(game.statusNum, awayTeamScore, homeTeamScore)}
                {this.renderScore(
                  game.statusNum,
                  awayTeamScore,
                  homeTeamScore,
                  true,
                )}
              </View>
            </View>
            <View style={styles.gameInfo}>
              <View style={{flex: 1}}>
                <View style={styles.gameClock}>{this.renderTime()}</View>
                <View style={[styles.gameStream, {marginTop: -10}]}>
                  <AnimatedText
                    numberOfLines={1}
                    style={styles.gameStreamValue}>
                    {this.getBroadcast()}
                  </AnimatedText>
                </View>
              </View>
              {this.renderNotificationIcon()}
            </View>
          </View>
          {game.nugget.text !== '' &&
          game.nugget.text !== 'Watch with NBA League Pass Free Preview' ? (
            <AnimatedText italic={true} style={styles.nugget}>
              {game.nugget.text}
            </AnimatedText>
          ) : game.playoffs && game.playoffs.seriesSummaryText !== '' ? (
            <AnimatedText italic={true} style={styles.nugget}>
              {game.playoffs.seriesSummaryText}
            </AnimatedText>
          ) : null}
        </View>
      </Animated.View>
    );
  }
}
