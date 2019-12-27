import React, {Component} from 'react';
import {View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {styles} from './MyTeamPlayer.styles';
import reactotron from 'reactotron-react-native';
import Loading from '../../components/Loading/Loading';
import {headshot} from '../../api/data.nba';
import {getGameLog, getSeasonAvg} from '../../api/stats.nba';
import {getTeamDetails, getTeamImage} from '../../utils/helper';
import AnimatedText from '../AnimatedText/AnimatedText';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment-timezone';
const fontScale = DeviceInfo.getFontScaleSync();
const MIN_WIDTH = {width: 45 * fontScale};
const NORMAL_WIDTH = {width: 43 * fontScale};
const PERCENT_WIDTH = {width: 60 * fontScale};
const FRACTION_WIDTH = {marginRight: 10};

export default class MyTeamPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      player: this.props.player,
      today: moment
        .tz(moment().startOf('day'), 'America/New_York')
        .format('MMM DD, YYYY'),
    };
  }

  componentWillReceiveProps(nextProps) {
    const {statType, player} = this.props;
    if (statType !== nextProps.statType) {
      this.fetchGameLog(player);
    }
  }

  componentDidMount() {
    const {player} = this.state;
    this.fetchGameLog(player);
  }

  fetchGameLog(player) {
    this.setState({loading: true});
    getGameLog(player.personId, 'Regular Season').then(data => {
      const logs = data.data.resultSets[0];
      const lastGame = logs.rowSet[0];
      switch (this.props.statType) {
        case 'today':
          this.showStats(lastGame);
          break;
        case 'latest':
          this.showStats(lastGame);
          break;
        case 'average':
          this.showAverage();
          break;
      }
    });
  }

  showStats(game) {
    const {player, statType} = this.props;
    if (statType === 'today' && game[3] !== this.state.today.toUpperCase()) {
      player.stats = {
        minutes: '-',
        points: '-',
        totReb: '-',
        assists: '-',
        steals: '-',
        blocks: '-',
        fgm: '-',
        fga: '-',
        fgp: '-',
        tpa: '-',
        tpm: '-',
        tpp: '-',
        ftm: '-',
        fta: '-',
        ftp: '-',
        turnovers: '-',
        plusMinus: '-',
      };
      this.setState({player: player, loading: false});
    } else {
      player.stats = {
        minutes: game[6].toFixed(0),
        points: game[24],
        totReb: game[18],
        assists: game[19],
        steals: game[20],
        blocks: game[21],
        fgm: game[7],
        fga: game[8],
        fgp: game[9],
        tpa: game[10],
        tpm: game[11],
        tpp: game[12],
        ftm: game[13],
        fta: game[14],
        ftp: game[15],
        turnovers: game[22],
        plusMinus: game[25] < 0 ? game[25] : `+${game[25]}`,
      };
      this.setState({player: player, loading: false});
    }
  }

  showAverage() {
    const {player} = this.props;
    getSeasonAvg(player.personId).then(data => {
      let result = data.data.resultSets[1].rowSet[0];
      player.stats = {
        minutes: result[9].toFixed(0),
        points: result[29],
        totReb: result[21],
        assists: result[22],
        steals: result[24],
        blocks: result[25],
        fgm: result[10],
        fga: result[11],
        fgp: result[12],
        tpm: result[13],
        tpa: result[14],
        tpp: result[15],
        ftm: result[16],
        fta: result[17],
        ftp: result[18],
        turnovers: result[23],
        plusMinus: result[30] < 0 ? result[30] : `+${result[30]}`,
      };
      reactotron.log(player);
      this.setState({player: player, loading: false});
    });
  }

  render() {
    const {loading, player} = this.state;
    const {navigation} = this.props;
    const playerTeam = getTeamDetails(player.teamId);
    const teamImage = getTeamImage(playerTeam.triCode);
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Player', this.props.player)}
          style={styles.details}>
          <View style={styles.teamContainer}>
            <Image source={teamImage} style={styles.teamImage} />
            <AnimatedText weight={500} style={styles.jersey}>
              {player.pos ? player.pos : `#${player.jersey}`}
            </AnimatedText>
          </View>
          <Image
            style={[
              styles.headshot,
              {backgroundColor: playerTeam.primaryColor},
            ]}
            source={{uri: headshot(player.personId)}}
          />
        </TouchableOpacity>
        <View style={styles.stats}>
          <AnimatedText weight={500} style={styles.playerName}>
            {player.firstName} {player.lastName}
            <AnimatedText style={styles.teamcode}>
              {' '}
              - {playerTeam.triCode}
            </AnimatedText>
          </AnimatedText>
          {loading ? (
            <Loading size="small" />
          ) : (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View>
                <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                  MIN
                </AnimatedText>
                <AnimatedText
                  style={[styles.statVal, NORMAL_WIDTH]}
                  weight={500}>
                  {player.stats.minutes}
                </AnimatedText>
              </View>
              <View>
                <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                  PTS
                </AnimatedText>
                <AnimatedText
                  style={[styles.statVal, NORMAL_WIDTH]}
                  weight={500}>
                  {player.stats.points}
                </AnimatedText>
              </View>
              <View>
                <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                  REB
                </AnimatedText>
                <AnimatedText
                  weight={500}
                  style={[styles.statVal, NORMAL_WIDTH]}>
                  {player.stats.totReb}
                </AnimatedText>
              </View>
              <View>
                <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                  AST
                </AnimatedText>
                <AnimatedText
                  weight={500}
                  style={[styles.statVal, NORMAL_WIDTH]}>
                  {player.stats.assists}
                </AnimatedText>
              </View>
              <View>
                <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                  STL
                </AnimatedText>
                <AnimatedText
                  weight={500}
                  style={[styles.statVal, NORMAL_WIDTH]}>
                  {player.stats.steals}
                </AnimatedText>
              </View>
              <View>
                <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                  BLK
                </AnimatedText>
                <AnimatedText
                  weight={500}
                  style={[styles.statVal, NORMAL_WIDTH]}>
                  {player.stats.blocks}
                </AnimatedText>
              </View>
              <View>
                <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                  FG
                </AnimatedText>
                <AnimatedText
                  weight={500}
                  style={[styles.statVal, FRACTION_WIDTH]}>
                  {player.stats.fgm}/{player.stats.fga}
                </AnimatedText>
              </View>
              <View>
                <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                  FG%
                </AnimatedText>
                <AnimatedText
                  weight={500}
                  style={[styles.statVal, PERCENT_WIDTH]}>
                  {player.stats.fgp}%
                </AnimatedText>
              </View>
              <View>
                <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                  3P
                </AnimatedText>
                <AnimatedText
                  weight={500}
                  style={[styles.statVal, FRACTION_WIDTH]}>
                  {player.stats.tpm}/{player.stats.tpa}
                </AnimatedText>
              </View>
              <View>
                <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                  3P%
                </AnimatedText>
                <AnimatedText
                  weight={500}
                  style={[styles.statVal, PERCENT_WIDTH]}>
                  {player.stats.tpp}%
                </AnimatedText>
              </View>
              <View>
                <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                  FT
                </AnimatedText>
                <AnimatedText
                  weight={500}
                  style={[styles.statVal, FRACTION_WIDTH]}>
                  {player.stats.ftm}/{player.stats.fta}%
                </AnimatedText>
              </View>
              <View>
                <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                  FT%
                </AnimatedText>
                <AnimatedText
                  weight={500}
                  style={[styles.statVal, PERCENT_WIDTH]}>
                  {player.stats.ftp}%
                </AnimatedText>
              </View>
              <View>
                <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                  OREB
                </AnimatedText>
                <AnimatedText
                  weight={500}
                  style={[styles.statVal, PERCENT_WIDTH]}>
                  {player.stats.offReb}
                </AnimatedText>
              </View>
              <View>
                <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                  DREB
                </AnimatedText>
                <AnimatedText
                  weight={500}
                  style={[styles.statVal, PERCENT_WIDTH]}>
                  {player.stats.defReb}
                </AnimatedText>
              </View>
              <View>
                <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                  TO
                </AnimatedText>
                <AnimatedText
                  weight={500}
                  style={[styles.statVal, PERCENT_WIDTH]}>
                  {player.stats.turnovers}
                </AnimatedText>
              </View>
              <View>
                <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                  +/-
                </AnimatedText>
                <AnimatedText
                  weight={500}
                  style={[styles.statVal, NORMAL_WIDTH]}>
                  {player.stats.plusMinus}
                </AnimatedText>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
}
