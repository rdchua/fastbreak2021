/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {styles} from './Standing.styles';
import AnimatedText from '../../components/AnimatedText/AnimatedText';
import DeviceInfo from 'react-native-device-info';
import {getTeamDetails, getTeamImage} from '../../utils/helper';

const fontScale = DeviceInfo.getFontScaleSync();
const TEAM_WIDTH = {width: 200 * fontScale};

class StandingsStats extends PureComponent {
  render() {
    const {team} = this.props;
    return (
      <View style={styles.standingsStats}>
        <Text style={[styles.tableData, {width: 30}]}>{team.win}</Text>
        <Text style={[styles.tableData, {width: 30}]}>{team.loss}</Text>
        <Text style={[styles.tableData, {width: 45}]}>{team.winPct}</Text>
        <Text style={[styles.tableData, {width: 40}]}>{team.gamesBehind}</Text>
        <Text style={[styles.tableData, {width: 50}]}>
          {team.homeWin}-{team.homeLoss}
        </Text>
        <Text style={[styles.tableData, {width: 50}]}>
          {team.awayWin}-{team.awayLoss}
        </Text>
        <Text style={[styles.tableData, {width: 45}]}>
          {team.lastTenWin}-{team.lastTenLoss}
        </Text>
        <Text style={[styles.tableData, {width: 45}]}>
          {team.isWinStreak ? 'W' : 'L'}
          {team.streak}
        </Text>
      </View>
    );
  }
}

class StandingsTeam extends PureComponent {
  render() {
    const {item, rank, navigation} = this.props;
    const team = getTeamDetails(item.teamId);
    const teamImage = getTeamImage(team.triCode);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Team', team)}
        style={styles.teamNameContainer}>
        <AnimatedText weight={700} style={styles.rank}>
          {rank + 1}
        </AnimatedText>
        <Image style={styles.teamLogo} source={teamImage} />
        <AnimatedText weight={500} numberOfLines={1} style={[styles.teamName]}>
          {team.triCode} {team.nickName}
        </AnimatedText>
      </TouchableOpacity>
    );
  }
}

export default class Standing extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showShadow: false,
      selected: 0,
    };
  }

  _renderTableHeaderStats = () => {
    return (
      <View style={styles.header}>
        <AnimatedText weight={700} style={[styles.tableHeader, {width: 30}]}>
          W
        </AnimatedText>
        <AnimatedText weight={700} style={[styles.tableHeader, {width: 30}]}>
          L
        </AnimatedText>
        <AnimatedText weight={700} style={[styles.tableHeader, {width: 45}]}>
          PCT
        </AnimatedText>
        <AnimatedText weight={700} style={[styles.tableHeader, {width: 40}]}>
          GB
        </AnimatedText>
        <AnimatedText weight={700} style={[styles.tableHeader, {width: 50}]}>
          HOME
        </AnimatedText>
        <AnimatedText weight={700} style={[styles.tableHeader, {width: 50}]}>
          AWAY
        </AnimatedText>
        <AnimatedText weight={700} style={[styles.tableHeader, {width: 45}]}>
          L10
        </AnimatedText>
        <AnimatedText weight={700} style={[styles.tableHeader, {width: 50}]}>
          STRK
        </AnimatedText>
      </View>
    );
  };

  handleScroll = e => {
    if (e.nativeEvent.contentOffset.x == 0) {
      this.setState({showShadow: false});
    } else {
      this.setState({showShadow: true});
    }
  };

  render() {
    const {teams, title, navigation} = this.props;
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={[styles.teamContainer, TEAM_WIDTH]}>
          <AnimatedText
            weight={700}
            style={[
              styles.tableHeader,
              {textAlign: 'left', paddingVertical: 5, paddingLeft: 12},
            ]}>
            {title ? title : 'TEAM'}
          </AnimatedText>
          <FlatList
            data={teams}
            extraData={teams}
            initialNumToRender={30}
            keyExtractor={item => item.teamId}
            renderItem={({item, index}) => (
              <StandingsTeam navigation={navigation} item={item} rank={index} />
            )}
          />
        </View>
        <ScrollView horizontal={true}>
          <FlatList
            initialNumToRender={30}
            ListHeaderComponent={this._renderTableHeaderStats}
            ItemSeparatorComponent={this._renderSeparator}
            data={teams}
            extraData={teams}
            keyExtractor={item => item.teamId}
            renderItem={({item}) => <StandingsStats team={item} />}
          />
        </ScrollView>
      </View>
    );
  }
}
