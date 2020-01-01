import React, {Component} from 'react';
import {
  ScrollView,
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {styles} from './Matchup.styles';
import reactotron from 'reactotron-react-native';
import {
  getTeamDetails,
  getTeamImage,
  getStatCategory,
  getPlayerDetailsByName,
} from '../../../utils/helper';
import FantasyPlayer from '../../../components/FantasyPlayer/FantasyPlayer';
import Card from '../../../components/Card/Card';
import AnimatedText from '../../../components/AnimatedText/AnimatedText';
import {
  accent,
  red,
  textSecondary,
  textPrimary,
  darkBackground,
} from '../../../Theme';
import FantasyTeamStat from '../../../components/FantasyTeamStat/FantasyTeamStat';
import Icon from 'react-native-vector-icons/AntDesign';
import {getRoster} from '../../../api/fantasy';
import {mapRoster} from '../../../utils/fantasy/teamHelper';

import * as tokenHelper from '../../../utils/fantasy/tokenHelper';
import Store from 'react-native-simple-store';
import moment from 'moment';
import {getPlayers, getScoreboard} from '../../../api/data.nba';
import FantasyBoxscore from '../../../components/FantasyBoxscore/FantasyBoxscore';
import Loading from '../../../components/Loading/Loading';

export default class Matchup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gamesLoading: true,
      playersLoading: true,
      rosterLoading: true,
      active: 0,
      statValue: 'today',
      currentWeek: this.props.week,
      dateText: moment().format('dddd, MMM DD'),
      date: moment
        .tz(moment().startOf('day'), 'America/New_York')
        .format('YYYY-MM-DD'),
    };
  }

  refreshToken(refresh_token) {
    const {matchup} = this.props;
    tokenHelper.refreshToken(refresh_token).then(token => {
      this.fetchTeam(matchup.teams[0].team_key, token.access_token);
      this.fetchTeam(matchup.teams[1].team_key, token.access_token);
    });
  }

  componentDidMount() {
    const {matchup} = this.props;
    reactotron.log('matchups', this.props.matchup);
    this.fetchPlayers();
    this.fetchScoreboard();
    Store.get('yahoo_token').then(token => {
      if (!token) {
        // this.yahooLogin();
      } else if (
        moment(token.time_generated)
          .add(59, 'minutes')
          .isBefore(moment())
      ) {
        this.refreshToken(token.refresh_token);
      } else {
        this.setState({token: token.access_token});
        this.fetchTeam(matchup.teams[0].team_key, token.access_token, 1);
        this.fetchTeam(matchup.teams[1].team_key, token.access_token, 2);
      }
    });
  }

  fetchPlayers() {
    getPlayers().then(response => {
      this.setState({
        players: response.data.league.standard,
        playersLoading: false,
      });
    });
  }

  fetchScoreboard() {
    let {date} = this.state;
    date = date.replace(/-/g, '');
    getScoreboard(date).then(response => {
      this.setState({
        games: response.data.games,
        gamesLoading: false,
      });
    });
  }

  fetchTeam(team_key, token, type) {
    const {date} = this.state;
    getRoster(team_key, token, 'date', date).then(response => {
      reactotron.log('roster', roster);
      const roster = mapRoster(response.fantasy_content.team[1].roster);
      if (type === 1) {
        reactotron.log('home team', roster);
        this.setState({homeRoster: roster, homeRosterLoading: false});
      } else {
        reactotron.log('away team', roster);
        this.setState({awayRoster: roster, awayRosterLoading: false});
      }
    });
  }

  renderPlayer = player => {
    const {players} = this.props;
    const playerInfo = getPlayerDetailsByName(players, player.name.full);
    const teamInfo = getTeamDetails(playerInfo.teamId);
    const teamImage = getTeamImage(teamInfo.triCode);
    return (
      <FantasyPlayer
        stats={player.stats}
        player={player}
        playerInfo={playerInfo}
        teamInfo={teamInfo}
        teamImage={teamImage}
      />
    );
  };

  renderTeamName = (myTeam, opponentTeam) => {
    const isWinner = this.isWinner(
      myTeam.points.total,
      opponentTeam.points.total,
    );
    const {active} = this.state;
    return (
      <View style={[styles.row, styles.scoreContainer]}>
        <TouchableOpacity
          onPress={() => this.setState({active: 1})}
          style={styles.teamInfo}>
          <Image
            style={styles.teamImage}
            source={{uri: myTeam.team_logos[0].url}}
          />
          <AnimatedText
            numberOfLines={1}
            style={[
              styles.teamName,
              {color: active === 1 ? accent : textPrimary},
            ]}>
            {myTeam.name}
          </AnimatedText>
          <AnimatedText style={styles.teamStanding}>
            {myTeam.managers[0].nickname}
          </AnimatedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.setState({active: 0})}
          style={[styles.row, styles.scoreboard]}>
          <View>
            <AnimatedText weight={700} style={styles.teamScore}>
              {myTeam.points.total} : {opponentTeam.points.total}
            </AnimatedText>
            <AnimatedText style={styles.gameClock}>
              Week {this.state.currentWeek}
            </AnimatedText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.setState({active: 2})}
          style={styles.teamInfo}>
          <Image
            style={styles.teamImage}
            source={{uri: opponentTeam.team_logos[0].url}}
          />
          <AnimatedText
            numberOfLines={1}
            style={[
              styles.teamName,
              {color: active === 2 ? accent : textPrimary},
            ]}>
            {opponentTeam.name}
          </AnimatedText>
          <AnimatedText style={styles.teamStanding}>
            {opponentTeam.managers[0].nickname}
          </AnimatedText>
        </TouchableOpacity>
      </View>
    );
  };

  renderStats = (stat, myScore, opponentScore, index) => {
    return (
      <FantasyTeamStat
        name={getStatCategory(stat.stat_id)}
        index={index}
        homeTeamColor={accent}
        awayTeamColor={red}
        homeTeamStat={this.checkNull(opponentScore.value)}
        awayTeamStat={this.checkNull(myScore.value)}
      />
    );
  };

  checkNull(val) {
    if (val == '') {
      return '-';
    }
    return val;
  }

  isWinner(myScore, opponentScore) {
    return Number(myScore) > Number(opponentScore);
  }

  renderPage = () => {
    const {
      active,
      players,
      homeRoster,
      awayRoster,
      gamesLoading,
      homeRosterLoading,
      awayRosterLoading,
      games,
    } = this.state;
    const {matchup} = this.props;
    const myTeam = matchup.teams[0];
    const opponentTeam = matchup.teams[1];
    if (active === 0) {
      return (
        <FlatList
          style={styles.teamStats}
          showsVerticalScrollIndicator={false}
          data={myTeam.stats}
          keyExtractor={item => item.stat_id}
          renderItem={({item, index}) =>
            this.renderStats(
              item,
              myTeam.stats[index],
              opponentTeam.stats[index],
              index,
            )
          }
        />
      );
    } else if (active === 1) {
      if (homeRosterLoading) {
        return <Loading size="small" backgroundColor={darkBackground} />;
      }
      return (
        <FantasyBoxscore
          players={players}
          roster={homeRoster}
          gamesLoading={gamesLoading}
          games={games}
        />
      );
    } else {
      if (awayRosterLoading) {
        return <Loading size="small" backgroundColor={darkBackground} />;
      }
      return (
        <FantasyBoxscore
          players={players}
          roster={awayRoster}
          gamesLoading={gamesLoading}
          games={games}
        />
      );
    }
  };

  render() {
    const {matchup} = this.props;
    const myTeam = matchup.teams[0];
    const opponentTeam = matchup.teams[1];
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {this.renderTeamName(myTeam, opponentTeam)}
        {this.renderPage()}
      </ScrollView>
    );
  }
}
