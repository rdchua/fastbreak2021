/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {styles} from './Boxscore.styles';
import reactotron from 'reactotron-react-native';
import {getBoxscore, headshot} from '../../../api/data.nba';
import {sortPlayersByTeam} from '../../../utils/helper';
import AnimatedText from '../../../components/AnimatedText/AnimatedText';
import Loading from '../../../components/Loading/Loading';
import DeviceInfo from 'react-native-device-info';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {getTeamDetails} from '../../../utils/helper';
import {darkBackground, accent, textSecondary} from '../../../Theme';
import {sortBy} from 'underscore';
const fontScale = DeviceInfo.getFontScaleSync();
const MIN_WIDTH = {width: 45 * fontScale};
const NORMAL_WIDTH = {width: 43 * fontScale};
const PERCENT_WIDTH = {width: 50 * fontScale};
import {boxscoreStats} from '../../../data/boxscore';
import Icon from 'react-native-vector-icons/AntDesign';

export default class Boxscore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: this.props.gameDetails,
      boxscoreLoading: true,
      selectedIndex: 0,
    };
  }

  componentDidMount() {
    this.fetchBoxscore();
    this.interval = setInterval(
      () => {
        const {game} = this.state;
        if (game.statusNum === 2) {
          this.fetchBoxscore();
        } else {
          clearInterval(this.interval);
        }
      },
      16000,
      1,
    );
  }

  fetchBoxscore() {
    const {game} = this.state;
    getBoxscore(game.startDateEastern, game.gameId).then(response => {
      const players = response.data.stats.activePlayers;
      let sortedPlayers = sortPlayersByTeam(
        players,
        game.hTeam.teamId,
        game.vTeam.teamId,
      );
      this.setState({
        boxscoreLoading: false,
        refreshing: false,
        selectedHeader: null,
        players: [sortedPlayers.homTeam, sortedPlayers.awayTeam],
      });
    });
  }

  renderPlayerItem = ({item, index}) => {
    const even = index % 2 === 0 ? true : false;
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Player', item)}
        style={[
          styles.row,
          styles.playerContainer,
          {backgroundColor: even ? '#181818' : null},
        ]}>
        <Image
          style={[
            styles.headshot,
            {backgroundColor: item.isOnCourt ? '#ccc' : null},
          ]}
          source={{uri: headshot(item.personId)}}
        />
        <View>
          <AnimatedText
            weight={item.isOnCourt ? 700 : null}
            style={styles.playerName}>
            {item.firstName.charAt(0)}. {item.lastName}{' '}
            {item.isOnCourt && item.pos !== '' ? `(${item.pos})` : null}
          </AnimatedText>
        </View>
      </TouchableOpacity>
    );
  };

  renderStat = val => {
    if (val === '') {
      return '-';
    }
    return val;
  };

  renderStatLine = ({item, index}) => {
    return (
      <View
        style={[
          styles.row,
          {backgroundColor: index % 2 === 0 ? '#181818' : null},
        ]}>
        <AnimatedText style={[styles.playerStat, MIN_WIDTH]}>
          {this.renderStat(item.min)}
        </AnimatedText>
        <AnimatedText style={[styles.playerStat, NORMAL_WIDTH]}>
          {this.renderStat(item.points)}
        </AnimatedText>
        <AnimatedText style={[styles.playerStat, NORMAL_WIDTH]}>
          {this.renderStat(item.totReb)}
        </AnimatedText>
        <AnimatedText style={[styles.playerStat, NORMAL_WIDTH]}>
          {this.renderStat(item.assists)}
        </AnimatedText>
        <AnimatedText style={[styles.playerStat, NORMAL_WIDTH]}>
          {this.renderStat(item.steals)}
        </AnimatedText>
        <AnimatedText style={[styles.playerStat, NORMAL_WIDTH]}>
          {this.renderStat(item.blocks)}
        </AnimatedText>
        <AnimatedText style={[styles.playerStat, PERCENT_WIDTH]}>
          {this.renderStat(item.fgm)}/{this.renderStat(item.fga)}
        </AnimatedText>
        <AnimatedText style={[styles.playerStat, PERCENT_WIDTH]}>
          {this.renderStat(item.fgp)}%
        </AnimatedText>
        <AnimatedText style={[styles.playerStat, PERCENT_WIDTH]}>
          {this.renderStat(item.tpm)}/{this.renderStat(item.tpa)}
        </AnimatedText>
        <AnimatedText style={[styles.playerStat, PERCENT_WIDTH]}>
          {this.renderStat(item.tpp)}%
        </AnimatedText>
        <AnimatedText style={[styles.playerStat, PERCENT_WIDTH]}>
          {this.renderStat(item.ftm)}/{this.renderStat(item.fta)}
        </AnimatedText>
        <AnimatedText style={[styles.playerStat, PERCENT_WIDTH]}>
          {this.renderStat(item.ftp)}%
        </AnimatedText>
        <AnimatedText style={[styles.playerStat, PERCENT_WIDTH]}>
          {this.renderStat(item.offReb)}
        </AnimatedText>
        <AnimatedText style={[styles.playerStat, PERCENT_WIDTH]}>
          {this.renderStat(item.defReb)}
        </AnimatedText>
        <AnimatedText style={[styles.playerStat, NORMAL_WIDTH]}>
          {this.renderStat(item.turnovers)}
        </AnimatedText>
        <AnimatedText style={[styles.playerStat, NORMAL_WIDTH]}>
          {this.renderStat(item.plusMinus)}
        </AnimatedText>
      </View>
    );
  };

  renderStatHeader = ({item, index}) => {
    const {selectedHeader} = this.state;
    const selected = selectedHeader === item.sortKey;
    return (
      <TouchableOpacity
        style={styles.headerName}
        onPress={() => this.sortPlayers(item.sortKey)}>
        <AnimatedText
          weight={700}
          style={[
            styles.tableHeader,
            item.width,
            {color: selected ? accent : textSecondary},
          ]}>
          {item.name}
        </AnimatedText>
        <Icon
          name="caretdown"
          size={6}
          color={selected ? accent : textSecondary}
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  };

  renderTableHeaderStats = () => {
    return (
      <FlatList
        horizontal
        style={styles.header}
        data={boxscoreStats}
        keyExtractor={item => item.name}
        renderItem={this.renderStatHeader}
      />
    );
  };

  sortPlayers(stat) {
    const {players} = this.state;
    const sortedPlayersHome = sortBy(players[0], player => {
      return player.sortKey[stat];
    });
    const sortedPlayersAway = sortBy(players[1], player => {
      return player.sortKey[stat];
    });
    this.setState({
      players: [sortedPlayersHome, sortedPlayersAway],
      selectedHeader: stat,
    });
  }

  handleIndexChange = index => {
    this.setState({selectedIndex: index});
  };

  onRefresh() {
    this.setState({refreshing: true});
    this.fetchBoxscore();
  }

  render() {
    const homeTeam = getTeamDetails(this.state.game.hTeam.teamId);
    const awayTeam = getTeamDetails(this.state.game.vTeam.teamId);
    if (this.state.boxscoreLoading) {
      return <Loading backgroundColor={darkBackground} />;
    }
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
        contentContainerStyle={styles.contentMain}
        style={styles.container}>
        <View style={styles.segment}>
          <SegmentedControlTab
            tabStyle={{backgroundColor: 'transparent'}}
            tabTextStyle={{padding: 3}}
            values={[homeTeam.altCityName, awayTeam.altCityName]}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}
          />
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.row}>
            <View style={styles.namesContainer}>
              <FlatList
                initialNumToRender={1000}
                data={this.state.players[this.state.selectedIndex]}
                extraData={this.state}
                ListHeaderComponent={
                  <AnimatedText
                    weight={700}
                    style={[
                      styles.tableHeader,
                      styles.header,
                      {textAlign: 'left', marginLeft: 15, color: textSecondary},
                    ]}>
                    PLAYER
                  </AnimatedText>
                }
                keyExtractor={item => item.personId}
                renderItem={this.renderPlayerItem}
              />
            </View>
            <ScrollView horizontal={true}>
              <FlatList
                initialNumToRender={1000}
                ListHeaderComponent={this.renderTableHeaderStats}
                data={this.state.players[this.state.selectedIndex]}
                extraData={this.state}
                keyExtractor={item => item.personId}
                renderItem={this.renderStatLine}
              />
            </ScrollView>
          </View>
        </ScrollView>
      </ScrollView>
    );
  }
}
