/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, ScrollView, Image, FlatList, RefreshControl} from 'react-native';
import {styles} from './Plays.styles';
import {getPlayByPlay} from '../../../api/data.nba';
import moment from 'moment';
import {toOrdinal, getTeamDetails, getTeamImage} from '../../../utils/helper';
import reactotron from 'reactotron-react-native';
import Loading from '../../../components/Loading/Loading';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import AnimatedText from '../../../components/AnimatedText/AnimatedText';
import {darkBackground} from '../../../Theme';
const dateFormat = 'YYYYMMDD';

export default class Plays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: this.props.gameDetails,
      selectedIndex: 0,
      refreshing: false,
      playsLoading: true,
    };
    this.interval;
  }

  componentDidMount() {
    this.getPlays();
    this.interval = setInterval(
      () => {
        const {game} = this.state;
        reactotron.log(game);
        if (game.statusNum === 2) {
          this.getPlays();
        } else {
          clearInterval(this.interval);
        }
      },
      16000,
      1,
    );
  }

  async getPlays() {
    const {game, selectedIndex} = this.state;
    // const gameDate = moment(game.startDateEastern).format(dateFormat);
    const noOfPeriods = game.period.maxRegular;
    const playsArr = [];
    const segments = [];
    for (let i = 1; i <= noOfPeriods; i++) {
      segments.push(toOrdinal(i));
      playsArr.push(getPlayByPlay(game.startDateEastern, game.gameId, i));
    }
    const response = await Promise.all(playsArr);
    this.setState({
      plays: response,
      selectedPlays: response[selectedIndex].data.plays.reverse(),
      quarters: segments,
      refreshing: false,
      playsLoading: false,
    });
  }

  renderPlay = ({item, index}) => {
    const team = getTeamDetails(item.teamId);
    const teamImage = getTeamImage(team.triCode);
    return (
      <View style={[styles.row, styles.play]}>
        <AnimatedText style={styles.clock}>{item.clock}</AnimatedText>
        <Image source={teamImage} style={styles.teamImage} />
        <AnimatedText style={styles.description}>
          {this.format(item.description)}
        </AnimatedText>
      </View>
    );
  };

  format(text) {
    let formatted = text.replace(/ *\[[^\]]*]/, '').trim();
    return formatted;
  }

  handleIndexChange = index => {
    const plays = this.state.plays;
    this.setState({
      selectedIndex: index,
      selectedPlays: plays[index].data.plays.reverse(),
    });
  };

  onRefresh() {
    this.setState({refreshing: true});
    this.getPlays();
  }

  render() {
    const {
      selectedPlays,
      playsLoading,
      refreshing,
      quarters,
      selectedIndex,
    } = this.state;
    if (playsLoading) {
      return <Loading backgroundColor={darkBackground} />;
    }
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
        style={styles.container}>
        <View style={styles.segment}>
          <SegmentedControlTab
            tabStyle={{backgroundColor: 'transparent'}}
            tabTextStyle={{padding: 3}}
            values={quarters}
            selectedIndex={selectedIndex}
            onTabPress={this.handleIndexChange}
          />
        </View>
        <FlatList
          data={selectedPlays}
          ListHeaderComponent={
            <AnimatedText style={styles.header}>
              {quarters[selectedIndex]} Quarter
            </AnimatedText>
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderPlay}
        />
      </ScrollView>
    );
  }
}
