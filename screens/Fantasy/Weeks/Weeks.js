/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from './Weeks.styles';
import Store from 'react-native-simple-store';
import {getMatchup, getStatCategories} from '../../../api/fantasy';
import * as tokenHelper from '../../../utils/fantasy/tokenHelper';
import reactotron from 'reactotron-react-native';
import moment from 'moment';
import {mapSettings} from '../../../utils/fantasy/leagueHelper';
import {mapMatchups} from '../../../utils/fantasy/teamHelper';
import Matchup from '../Matchup/Matchup';
import Loading from '../../../components/Loading/Loading';
import {darkBackground} from '../../../Theme';
import AnimatedText from '../../../components/AnimatedText/AnimatedText';

export default class Weeks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchups: null,
      myTeam: null,
      opponentTeam: null,
      roster: null,
      loading: true,
      statCategories: null,
      currentWeek: null,
      players: null,
    };
  }

  componentDidMount() {
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
          this.getData(token, team_key);
        }
      });
    });
  }

  refreshToken(refresh_token, team_key) {
    tokenHelper.refreshToken(refresh_token).then(token => {
      this.getData(token, team_key);
    });
  }

  getData(token, team_key) {
    this.getMatchup(token.access_token, team_key);
    this.getLeagueStatCategories(token.access_token, team_key);
  }

  getMatchup(token, team_key) {
    getMatchup(team_key, token).then(data => {
      const matchups = mapMatchups(data.fantasy_content.team[1].matchups);

      this.setState({matchups: matchups});
    });
  }

  getLeagueStatCategories(token, team_key) {
    team_key = team_key.split('.');
    const league_key = `${team_key[0]}.${team_key[1]}.${team_key[2]}`;
    getStatCategories(league_key, token).then(data => {
      const settings = mapSettings(data.fantasy_content.league[1].settings[0]);
      const league = data.fantasy_content.league[0];
      reactotron.log(league.current_week);
      this.setState({
        statCategories: settings.stat_categories,
        currentWeek: league.current_week,
      });
    });
  }

  render() {
    if (!this.state.statCategories || !this.state.matchups) {
      return <Loading backgroundColor={darkBackground} />;
    }
    const {matchups, players, statCategories, roster, currentWeek} = this.state;
    reactotron.log(matchups);
    return (
      <View style={{flex: 1}}>
        <Matchup
          matchup={matchups[currentWeek - 1]}
          players={players}
          statCategories={statCategories}
          roster={roster}
          week={currentWeek - 1}
        />
      </View>
    );
  }
}
