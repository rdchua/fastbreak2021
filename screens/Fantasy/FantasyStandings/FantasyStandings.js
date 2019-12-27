/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {ScrollView, FlatList, View, Image} from 'react-native';
import {styles} from './FantasyStandingsStyles';
import * as tokenHelper from '../../../api/yahoo_fantasy';
import Store from 'react-native-simple-store';
import moment from 'moment';
import {getLeagueTeams} from '../../../api/fantasy';

import {parseLeagueCollection} from '../../../utils/fantasy/teamHelper';
import reactotron from 'reactotron-react-native';
import Loading from '../../../components/Loading/Loading';
import AnimatedText from '../../../components/AnimatedText/AnimatedText';
import Card from '../../../components/Card/Card';
import {darkBackground} from '../../../Theme';

export default class FantasyStandings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
          this.getLeagueTeams(token.access_token, team_key);
        }
      });
    });
  }

  refreshToken(refresh_token, team_key) {
    tokenHelper.refreshToken(refresh_token).then(token => {
      this.getLeaguePlayers(token.access_token, team_key);
    });
  }

  getLeagueTeams(token, team_key) {
    team_key = team_key.split('.');
    const league_key = `${team_key[0]}.${team_key[1]}.${team_key[2]}`;
    const subresources = ['standings'];
    getLeagueTeams(token, league_key, subresources).then(data => {
      let leagues = parseLeagueCollection(
        data.fantasy_content.leagues,
        subresources,
      );
      leagues = leagues[0].teams.sort((a, b) =>
        parseInt(a.standings.rank) > parseInt(b.standings.rank)
          ? 1
          : parseInt(b.standings.rank) > parseInt(a.standings.rank)
          ? -1
          : 0,
      );
      reactotron.log(leagues);
      this.setState({teams: leagues, loading: false});
    });
  }

  renderStanding = ({item, index}) => {
    const even = index % 2 === 0;
    return (
      <View
        style={[
          styles.row,
          {
            paddingVertical: 5,
            paddingHorizontal: 5,
            backgroundColor: even ? darkBackground : '#181818',
          },
        ]}>
        <AnimatedText weight={500} style={styles.rank}>
          {index + 1}
        </AnimatedText>
        <Image source={{uri: item.team_logos[0].url}} style={styles.teamLogo} />
        <AnimatedText weight={500} numberOfLines={1} style={styles.teamName}>
          {item.name}
        </AnimatedText>
        <AnimatedText style={[styles.teamStanding, {width: 80}]}>
          {item.standings.outcome_totals.wins}-
          {item.standings.outcome_totals.losses}-
          {item.standings.outcome_totals.ties}
        </AnimatedText>
        <AnimatedText style={styles.percentage}>
          {this.checkPct(item.standings.outcome_totals.percentage)}
        </AnimatedText>
      </View>
    );
  };

  renderHeader = () => {
    return (
      <View style={[styles.row, {marginBottom: 10}]}>
        <AnimatedText
          style={[
            styles.header,
            {width: 250, textAlign: 'left', paddingLeft: 15},
          ]}>
          TEAM
        </AnimatedText>
        <AnimatedText style={[styles.header, {width: 80}]}>W-L-T</AnimatedText>
        <AnimatedText style={[styles.header, {width: 60}]}>PCT</AnimatedText>
      </View>
    );
  };

  checkPct(val) {
    if (val === '') {
      return 0.0;
    }
    return val;
  }

  render() {
    if (this.state.loading) {
      return <Loading backgroundColor={darkBackground} />;
    }
    return (
      <ScrollView style={styles.container}>
        <FlatList
          ListHeaderComponent={this.renderHeader}
          data={this.state.teams}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderStanding}
        />
      </ScrollView>
    );
  }
}
