import React, {Component} from 'reactn';
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {styles} from './FantasyPlayers.styles';
import Store from 'react-native-simple-store';
import moment from 'moment';
import {getLeaguePlayers} from '../../../api/fantasy';
import {getPlayers, headshot} from '../../../api/data.nba';
import {parseLeagueCollection} from '../../../utils/fantasy/playerHelper';
import {
  getPlayerDetailsByName,
  getTeamDetails,
  getTeamImage,
  getStatCategory,
} from '../../../utils/helper';
import Loading from '../../../components/Loading/Loading';
import {darkBackground} from '../../../Theme';
import reactotron from 'reactotron-react-native';
import AnimatedText from '../../../components/AnimatedText/AnimatedText';
import DeviceInfo from 'react-native-device-info';
const fontScale = DeviceInfo.getFontScaleSync();
const NORMAL_WIDTH = {width: 45 * fontScale};
const MIN_WIDTH = {width: 45 * fontScale};
const MAX_WIDTH = {width: 75 * fontScale};

export default class FantasyPlayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fantasyPlayersLoading: true,
      playersLoading: true,
      searching: false,
    };
  }

  componentDidMount() {
    this.fetchPlayers();
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
          this.fetchLeaguePlayers(team_key, token.access_token);
        }
      });
    });
  }

  fetchPlayers() {
    getPlayers(this.global.seasonYear).then(response => {
      this.setState({
        players: response.data.league.standard,
        playersLoading: false,
      });
    });
  }

  fetchLeaguePlayers(team_key, token) {
    team_key = team_key.split('.');
    const league_key = `${team_key[0]}.${team_key[1]}.${team_key[2]}`;
    const subresources = [
      'stats',
      'ownership',
      'percent_owned',
      'draft_analysis',
    ];
    const filters = {
      status: 'A',
      sort: 'AR',
    };
    getLeaguePlayers(token, league_key, filters, subresources).then(data => {
      const leagues = parseLeagueCollection(
        data.fantasy_content.leagues,
        subresources,
      );
      this.setState({
        fantasyPlayers: leagues[0].players.filter(
          player => player.status !== 'NA',
        ),
        fantasyPlayersLoading: false,
      });
    });
  }

  renderPlayerItem = ({item, index}) => {
    const {players} = this.state;
    const player = getPlayerDetailsByName(players, item.name.full);
    if (!player) {
      return (
        <View
          onPress={() => this.props.navigation.navigate('Player', player)}
          style={[
            styles.row,
            styles.playerContainer,
            {backgroundColor: index % 2 === 0 ? '#181818' : null},
          ]}>
          <Image
            style={[styles.headshot, {backgroundColor: '#222'}]}
            source={{uri: item.headshot.url}}
          />
          <View>
            <AnimatedText style={styles.playerName}>
              {item.name.full}
              <AnimatedText weight={500} style={styles.status}>
                {'  '}
                {item.status ? item.status : null}
              </AnimatedText>
            </AnimatedText>
            <AnimatedText style={styles.playerTeam}>
              ({item.display_position})
            </AnimatedText>
          </View>
        </View>
      );
    }
    const teamInfo = getTeamDetails(player.teamId);
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Player', player)}
        style={[
          styles.row,
          styles.playerContainer,
          {backgroundColor: index % 2 === 0 ? '#181818' : null},
        ]}>
        <Image
          style={[styles.headshot, {backgroundColor: teamInfo.primaryColor}]}
          source={{uri: headshot(player.personId)}}
        />
        <View>
          <AnimatedText style={styles.playerName}>
            {item.name.full}
            <AnimatedText weight={500} style={styles.status}>
              {'  '}
              {item.status ? item.status : null}
            </AnimatedText>
          </AnimatedText>
          <AnimatedText style={styles.playerTeam}>
            {teamInfo.triCode} {teamInfo.nickName} ({item.display_position})
          </AnimatedText>
        </View>
      </TouchableOpacity>
    );
  };

  renderStatLine = ({item, index}) => {
    return (
      <FlatList
        horizontal
        style={{backgroundColor: index % 2 === 0 ? '#181818' : null}}
        data={item.stats.stats}
        keyExtractor={p => p.stat_id}
        renderItem={this.renderStatValue}
      />
    );
  };

  renderTableHeaderStats = () => {
    if (this.state.fantasyPlayers.length > 0) {
      return (
        <FlatList
          horizontal
          style={styles.header}
          data={this.state.fantasyPlayers[0].stats.stats}
          keyExtractor={item => item.stat_id}
          renderItem={this.renderStatName}
        />
      );
    } else {
      return <View />;
    }
  };

  renderStatName = ({item, index}) => {
    return (
      <AnimatedText
        weight={700}
        style={[
          styles.tableHeader,
          parseInt(item.stat_id) === 9004003 ? MAX_WIDTH : MIN_WIDTH,
        ]}>
        {getStatCategory(item.stat_id)}
      </AnimatedText>
    );
  };

  renderStatValue = ({item, index}) => {
    return (
      <AnimatedText
        style={[
          styles.playerStat,
          parseInt(item.stat_id) === 9004003 ? MAX_WIDTH : NORMAL_WIDTH,
        ]}>
        {item.value}
      </AnimatedText>
    );
  };

  searchPlayer() {
    const {token, teamKey, query} = this.state;
    this.setState({searching: true});
    const team_key = teamKey.split('.');
    const league_key = `${team_key[0]}.${team_key[1]}.${team_key[2]}`;
    const subresources = [
      'stats',
      'ownership',
      'percent_owned',
      'draft_analysis',
    ];
    const filters = {
      status: 'A',
      sort: 'AR',
      search: query,
    };
    getLeaguePlayers(token, league_key, filters, subresources).then(data => {
      const leagues = parseLeagueCollection(
        data.fantasy_content.leagues,
        subresources,
      );
      this.setState({
        fantasyPlayers: leagues[0].players.filter(
          player => player.status !== 'NA',
        ),
        searching: false,
      });
    });
  }

  render() {
    const {
      playersLoading,
      fantasyPlayersLoading,
      fantasyPlayers,
      query,
      searching,
    } = this.state;
    if (playersLoading || fantasyPlayersLoading) {
      return <Loading backgroundColor={darkBackground} />;
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            blurOnSubmit={true}
            placeholder="Search player"
            placeholderTextColor="#888"
            onChangeText={text => this.setState({query: text})}
            onSubmitEditing={text => this.searchPlayer(text)}
            value={query}
          />
          {searching ? (
            <ActivityIndicator style={styles.searchingIndicator} color="#fff" />
          ) : null}
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.row}>
            <View style={styles.namesContainer}>
              <FlatList
                ListHeaderComponent={
                  <AnimatedText
                    weight={700}
                    style={[
                      styles.tableHeader,
                      styles.header,
                      {textAlign: 'left', marginLeft: 15},
                    ]}>
                    PLAYER
                  </AnimatedText>
                }
                initialNumToRender={1000}
                data={fantasyPlayers}
                keyExtractor={item => item.player_key}
                renderItem={this.renderPlayerItem}
              />
            </View>
            <ScrollView horizontal={true}>
              <FlatList
                initialNumToRender={1000}
                ListHeaderComponent={this.renderTableHeaderStats}
                data={fantasyPlayers}
                keyExtractor={item => item.person_key}
                renderItem={this.renderStatLine}
              />
            </ScrollView>
          </View>
        </ScrollView>
      </ScrollView>
    );
  }
}
