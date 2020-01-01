/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {styles} from './FantasyTeam.styles';
import {getPlayers, getScoreboard} from '../../../api/data.nba';
import Store from 'react-native-simple-store';
import * as tokenHelper from '../../../utils/fantasy/tokenHelper';
import {
  getTeamStanding,
  getTeamStats,
  getRoster,
  getLeague,
} from '../../../api/fantasy';
import {mapTeam, mapStats, mapRoster} from '../../../utils/fantasy/teamHelper';
import moment from 'moment-timezone';
import Icon from 'react-native-vector-icons/AntDesign';
import Loading from '../../../components/Loading/Loading';
import {darkBackground, cardBackground} from '../../../Theme';
import AnimatedText from '../../../components/AnimatedText/AnimatedText';
import {toRank, getStatCategory} from '../../../utils/helper';
import reactotron from 'reactotron-react-native';
import FantasyBoxscore from '../../../components/FantasyBoxscore/FantasyBoxscore';
import ModalDropdown from 'react-native-modal-dropdown';

export default class FantasyTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamLoading: true,
      rosterLoading: true,
      playersLoading: true,
      statsLoading: true,
      gamesLoading: true,
      dateType: 'date',
      dateText: moment().format('dddd, MMM DD'),
      date: moment
        .tz(moment().startOf('day'), 'America/New_York')
        .format('YYYY-MM-DD'),
    };
  }

  componentDidMount() {
    const {date} = this.state;
    this.fetchPlayers();
    this.fetchScoreboard();
    Store.get('yahoo_token').then(token => {
      Store.get('team_key').then(team_key => {
        if (!token) {
          // this.yahooLogin();
        } else if (
          moment(token.time_generated)
            .add(59, 'minutes')
            .isBefore(moment())
        ) {
          this.refreshToken(token.refresh_token, team_key);
        } else {
          this.setState({
            token: token.access_token,
            teamKey: team_key,
          });
          this.fetchTeam(team_key, token.access_token);
          this.fetchStats(team_key, token.access_token, 'date', date);
          this.fetchRoster(team_key, token.access_token, 'date', date);
        }
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

  fetchTeam(team_key, token) {
    getTeamStanding(team_key, token).then(response => {
      reactotron.log(response);
      const standing = response.fantasy_content.team[1].team_standings;
      const team = mapTeam(response.fantasy_content.team[0]);
      team.standings = standing;
      this.setState({team: team, teamLoading: false});
    });
  }

  fetchStats(team_key, token, type, date) {
    let temp = team_key.split('.');
    const league_key = `${temp[0]}.${temp[1]}.${temp[2]}`;
    getLeague(league_key, token).then(response => {
      const league = response.fantasy_content.league[0];
      getTeamStats(team_key, token, type, date).then(data => {
        const stats = mapStats(data.fantasy_content.team[1].team_stats.stats);
        this.setState({
          statsLoading: false,
          teamStats: stats,
          currentWeek: league.current_week,
        });
      });
    });
  }

  fetchRoster(team_key, token, type, date) {
    getRoster(team_key, token, type, date).then(response => {
      reactotron.log(response);
      const roster = mapRoster(response.fantasy_content.team[1].roster);
      reactotron.log(date, roster);
      this.setState({roster: roster, rosterLoading: false});
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

  refreshToken(refresh_token, team_key) {
    const {date} = this.state;
    tokenHelper.refreshToken(refresh_token).then(token => {
      this.fetchTeam(team_key, token.access_token);
      this.fetchStats(team_key, token.access_token, 'date', date);
      this.fetchRoster(team_key, token.access_token, '', date);
    });
  }

  renderTeamStat = ({item, index}) => {
    return (
      <View style={styles.teamStatContainer}>
        <AnimatedText style={styles.teamStatName}>
          {getStatCategory(item.stat_id)}
        </AnimatedText>
        <AnimatedText style={styles.teamStatValue}>{item.value}</AnimatedText>
      </View>
    );
  };

  handleNextDay() {
    const {dateType} = this.state;
    if (dateType === 'date') {
      this.setState(
        {
          rosterLoading: true,
          statsLoading: true,
          dateText: moment(this.state.dateText, 'dddd, MMM DD')
            .add(1, 'days')
            .format('dddd, MMM DD'),
          date: moment(this.state.date, 'YYYY-MM-DD')
            .add(1, 'days')
            .format('YYYY-MM-DD'),
        },
        () => {
          const {date, teamKey, token} = this.state;
          this.fetchScoreboard();
          this.fetchRoster(teamKey, token, '', date);
          this.fetchStats(teamKey, token, 'date', date);
        },
      );
    } else {
      let newWeek = this.state.currentWeek + 1;
      this.setState(
        {
          rosterLoading: true,
          statsLoading: true,
          currentWeek: newWeek,
          dateText: `Week ${newWeek}`,
        },
        () => {
          const {currentWeek, teamKey, token} = this.state;
          reactotron.log('currentweek', currentWeek);
          this.fetchScoreboard();
          this.fetchRoster(teamKey, token, 'week', currentWeek);
          this.fetchStats(teamKey, token, 'week', currentWeek);
        },
      );
    }
  }

  handlePrevDay() {
    const {dateType} = this.state;
    if (dateType === 'date') {
      this.setState(
        {
          rosterLoading: true,
          statsLoading: true,
          dateText: moment(this.state.dateText, 'dddd, MMM DD')
            .subtract(1, 'days')
            .format('dddd, MMM DD'),
          date: moment(this.state.date, 'YYYY-MM-DD')
            .subtract(1, 'days')
            .format('YYYY-MM-DD'),
        },
        () => {
          const {date, teamKey, token} = this.state;
          this.fetchScoreboard();
          this.fetchRoster(teamKey, token, '', date);
          this.fetchStats(teamKey, token, 'date', date);
        },
      );
    } else {
      let newWeek = this.state.currentWeek - 1;
      this.setState(
        {
          rosterLoading: true,
          statsLoading: true,
          currentWeek: newWeek,
          dateText: `Week ${newWeek}`,
        },
        () => {
          const {currentWeek, teamKey, token} = this.state;
          reactotron.log('currentweek', currentWeek);
          this.fetchScoreboard();
          this.fetchRoster(teamKey, token, 'week', currentWeek);
          this.fetchStats(teamKey, token, 'week', currentWeek);
        },
      );
    }
  }

  renderTeamStats = teamStats => {
    const {statsLoading} = this.state;
    if (statsLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Loading size="small" color="#aaa" />
        </View>
      );
    }
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.teamStatContentContainer}
        data={teamStats}
        keyExtractor={item => item.stat_id}
        renderItem={this.renderTeamStat}
      />
    );
  };

  renderTeam = roster => {
    const {rosterLoading, games, players, gamesLoading} = this.state;
    if (rosterLoading) {
      return <Loading style={{marginTop: 15}} size="small" color="#aaa" />;
    }
    return (
      <FantasyBoxscore
        players={players}
        roster={roster}
        gamesLoading={gamesLoading}
        rosterLoading={rosterLoading}
        games={games}
      />
    );
  };

  handleDropdownSelect = (index, value) => {
    this.setState({rosterLoading: true, statsLoading: true});
    let {date, teamKey, token, currentWeek} = this.state;
    switch (parseInt(index)) {
      case 0:
        this.fetchRoster(teamKey, token, '', date);
        this.fetchStats(teamKey, token, 'date', date);
        this.setState({
          dateType: 'date',
          dateDisabled: false,
          dateText: moment(this.state.date, 'YYYY-MM-DD').format(
            'dddd, MMM DD',
          ),
        });
        break;
      case 1:
        this.fetchRoster(teamKey, token, 'week', currentWeek);
        this.fetchStats(teamKey, token, 'week', currentWeek);
        this.setState({
          dateType: 'week',
          dateDisabled: false,
          dateText: `Week ${currentWeek}`,
        });
        break;
      case 2:
        this.fetchRoster(teamKey, token, 'season', date);
        this.setState({dateDisabled: true});
        break;
      default:
        this.fetchRoster(teamKey, token, '', date);
        this.fetchStats(teamKey, token, 'date', date);
        this.setState({dateType: 'date', dateDisabled: false});
        break;
    }
  };

  render() {
    const {
      team,
      teamLoading,
      teamStats,
      roster,
      playersLoading,
      dateText,
      dateDisabled,
      currentWeek,
    } = this.state;
    if (teamLoading || playersLoading) {
      return <Loading backgroundColor={darkBackground} />;
    }
    return (
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.container}>
        <View style={styles.managerContainer}>
          <View style={styles.row}>
            <Image
              source={{uri: team.team_logos[0].url}}
              style={styles.teamLogo}
            />
            <View>
              <AnimatedText weight={700} style={styles.teamName}>
                {team.name}
              </AnimatedText>
              <AnimatedText style={styles.teamStanding}>
                {toRank(team.standings.rank)} Overall (
                {team.standings.outcome_totals.wins}-
                {team.standings.outcome_totals.losses}-
                {team.standings.outcome_totals.ties})
              </AnimatedText>
            </View>
          </View>
        </View>
        <View style={[styles.row, styles.dateContainer]}>
          <TouchableOpacity
            disabled={dateDisabled}
            onPress={() => this.handlePrevDay()}
            style={styles.iconContainer}>
            <Icon style={styles.icon} name="left" size={14} color="white" />
          </TouchableOpacity>
          <View style={[styles.row, styles.dropdownContainer]}>
            <ModalDropdown
              style={styles.date}
              textStyle={styles.textStyle}
              defaultValue={'Daily'}
              dropdownStyle={styles.dropdownStyle}
              dropdownTextStyle={styles.dropdownTextStyle}
              dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
              defaultIndex={0}
              onSelect={this.handleDropdownSelect}
              renderSeparator={() => {
                return <View style={{height: 0.7, backgroundColor: '#333'}} />;
              }}
              options={[`Daily`, `Weekly`, 'Season (Total)']}
            />
            <Icon style={styles.icon} name="caretdown" color="#fff" size={10} />
          </View>
          <AnimatedText style={styles.date}>{dateText}</AnimatedText>
          <TouchableOpacity
            disabled={dateDisabled}
            onPress={() => this.handleNextDay()}
            style={styles.iconContainer}>
            <Icon style={styles.icon} name="right" size={14} color="white" />
          </TouchableOpacity>
        </View>
        <AnimatedText weight={700} style={styles.listHeader}>
          TEAM STATS
        </AnimatedText>
        {this.renderTeamStats(teamStats)}
        {this.renderTeam(roster)}
      </ScrollView>
    );
  }
}
