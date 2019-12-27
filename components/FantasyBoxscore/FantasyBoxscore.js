import React, {PureComponent} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {styles} from './FantasyBoxscore.styles';
import AnimatedText from '../AnimatedText/AnimatedText';
import DeviceInfo from 'react-native-device-info';
import reactotron from 'reactotron-react-native';
import {
  getPlayerDetailsByName,
  getTeamDetails,
  getTime,
  getStatCategory,
} from '../../utils/helper';
import {darkBackground} from '../../Theme';
import Loading from '../Loading/Loading';
import {headshot} from '../../api/data.nba';
const fontScale = DeviceInfo.getFontScaleSync();
const MIN_WIDTH = {width: 45 * fontScale};
const NORMAL_WIDTH = {width: 45 * fontScale};

export default class FantasyBoxscore extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  findGame(player) {
    const {games} = this.props;
    const game = games.find(game => {
      return (
        game.vTeam.teamId === player.teamId ||
        game.hTeam.teamId === player.teamId
      );
    });
    return game;
  }

  renderStatValue = ({item, index}) => {
    return (
      <AnimatedText style={[styles.playerStat, NORMAL_WIDTH]}>
        {item.stat.value}
      </AnimatedText>
    );
  };

  renderStatLine = ({item, index}) => {
    const {players, gamesLoading} = this.props;
    if (gamesLoading) {
      return <Loading size="small" backgroundColor={darkBackground} />;
    }
    const player = getPlayerDetailsByName(players, item.name.full);
    const game = this.findGame(player);
    return (
      <FlatList
        horizontal
        style={{
          backgroundColor: index % 2 === 0 ? '#181818' : null,
          height: game ? 63.15 : 52,
        }}
        data={item.stats}
        keyExtractor={p => p.stat.stat_id}
        renderItem={this.renderStatValue}
      />
    );
  };

  renderStatName = ({item, index}) => {
    return (
      <AnimatedText weight={700} style={[styles.tableHeader, MIN_WIDTH]}>
        {getStatCategory(item.stat.stat_id)}
      </AnimatedText>
    );
  };

  renderTableHeaderStats = () => {
    return (
      <FlatList
        horizontal
        style={styles.header}
        data={this.props.roster[0].stats}
        keyExtractor={item => item.stat.stat_id}
        renderItem={this.renderStatName}
      />
    );
  };

  renderPlayerItem = ({item, index}) => {
    const {players, gamesLoading} = this.props;
    const player = getPlayerDetailsByName(players, item.name.full);
    if (gamesLoading) {
      return <Loading backgroundColor={darkBackground} size="small" />;
    } else if (!player) {
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
    const game = this.findGame(player);
    let isHome;
    if (game) {
      isHome = game.hTeam.teamId === player.teamId;
    }
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
          {game ? (
            <AnimatedText style={styles.playerTeam}>
              {getTime(game)}{' '}
              {isHome ? `vs. ${game.vTeam.triCode}` : `@ ${game.hTeam.triCode}`}
            </AnimatedText>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {roster} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.row}>
          <View style={styles.namesContainer}>
            <FlatList
              initialNumToRender={1000}
              data={roster}
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
              keyExtractor={item => item.player_key}
              renderItem={this.renderPlayerItem}
            />
          </View>
          <ScrollView horizontal={true}>
            <FlatList
              initialNumToRender={1000}
              ListHeaderComponent={this.renderTableHeaderStats}
              data={roster}
              keyExtractor={item => item.person_key}
              renderItem={this.renderStatLine}
            />
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}
