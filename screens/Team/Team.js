import React, {Component} from 'reactn';
import {
  View,
  ScrollView,
  Image,
  StatusBar,
  FlatList,
  Linking,
  Alert,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {styles} from './Team.styles';
import {
  getTeamImage,
  getPlayerDetails,
  validatePurchase,
} from '../../utils/helper';
import {getTeamLeaders, getPlayers, getRoster} from '../../api/data.nba';
import {getTeamStats} from '../../api/stats.nba';
import {getTeamNews} from '../../api/news';
import {toRank} from '../../utils/helper';
import * as theme from '../../Theme';
import reactotron from 'reactotron-react-native';
import AnimatedText from '../../components/AnimatedText/AnimatedText';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import StatLeader from '../../components/StatLeader/StatLeader';
import Loading from '../../components/Loading/Loading';
import StatsNbaTeam from '../../components/Stats.Nba/StatsNbaTeam';
import StatsNbaHeaderTeam from '../../components/Stats.Nba/StatsNbaTeamHeader';
import NewsCover from '../../components/NewsCover/NewsCover';
import moment from 'moment';
import Modal from 'react-native-modal';
import NewsFeed from '../../components/NewsFeed/NewsFeed';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
const headerHeight = 176;

export default class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: this.props.navigation.state.params,
      leadersLoading: true,
      statsLoading: true,
      newsLoading: true,
      rosterLoading: true,
      animationSet: false,
    };
    this.contentView = React.createRef();
    this.scrollY = new Animated.Value(0);
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    validatePurchase('Game Details');
    this.fetchLeaders();
    this.fetchStats();
    this.fetchNews();
    this.fetchRoster();
    this.props.navigation.setParams({
      animatedValue: this.scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [25, 0],
        extrapolate: 'clamp',
      }),
      animatedOpacity: this.scrollY.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
    });
  }

  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params;
    const translateY = params.animatedValue;
    const transform = [{translateY}];
    return {
      headerTitle: (
        <Animated.View
          style={[
            transform,
            {
              flex: 1,
              opacity: params.animatedOpacity ? params.animatedOpacity : 0,
            },
          ]}>
          <AnimatedText weight={700} style={styles.headerTitle}>
            {params.fullName}
          </AnimatedText>
        </Animated.View>
      ),
      headerStyle: {
        elevation: 0,
        backgroundColor: theme.cardBackground,
      },
      headerTintColor: '#fff',
    };
  };

  fetchRoster() {
    const {team} = this.state;
    getRoster(this.global.seasonYear, team.urlName).then(response => {
      this.setState({
        roster: response.data.league.standard.players,
        rosterLoading: false,
      });
    });
  }

  fetchLeaders() {
    const {team} = this.state;
    Promise.all([
      getPlayers(this.global.seasonYear),
      getTeamLeaders(this.global.seasonYear, team.urlName),
    ]).then(response => {
      const players = response[0].data.league.standard;
      const leaders = response[1].data.league.standard;
      const pointsLeader = {
        info: getPlayerDetails(players, leaders.ppg[0].personId),
        value: leaders.ppg[0].value,
      };
      const reboundLeader = {
        info: getPlayerDetails(players, leaders.trpg[0].personId),
        value: leaders.trpg[0].value,
      };
      const assistLeader = {
        info: getPlayerDetails(players, leaders.apg[0].personId),
        value: leaders.apg[0].value,
      };
      const stealLeader = {
        info: getPlayerDetails(players, leaders.spg[0].personId),
        value: leaders.bpg[0].value,
      };
      const blockLeader = {
        info: getPlayerDetails(players, leaders.bpg[0].personId),
        value: leaders.bpg[0].value,
      };
      const fieldGoalLeader = {
        info: getPlayerDetails(players, leaders.fgp[0].personId),
        value: (leaders.fgp[0].value * 100).toFixed(1) + '%',
      };
      const threeLeader = {
        info: getPlayerDetails(players, leaders.tpg[0].personId),
        value: leaders.tpg[0].value,
      };
      this.setState({
        players: players,
        pointsLeader: pointsLeader,
        reboundLeader: reboundLeader,
        assistLeader: assistLeader,
        blockLeader: blockLeader,
        fieldGoalLeader: fieldGoalLeader,
        threeLeader: threeLeader,
        stealLeader: stealLeader,
        leadersLoading: false,
      });
    });
  }

  fetchStats() {
    const {team} = this.state;
    getTeamStats().then(response => {
      const teams = response.data.resultSets[0].rowSet;
      const teamStats = teams.find(obj => {
        return obj[0] === parseInt(team.teamId);
      });
      this.setState({
        statsLoading: false,
        teamStats: teamStats,
      });
    });
  }

  fetchNews() {
    const {team} = this.state;
    getTeamNews(team.urlName).then(response => {
      this.setState({news: response.data.results, newsLoading: false});
    });
  }

  renderLeaders = () => {
    if (this.state.leadersLoading) {
      return (
        <View style={{marginTop: 10, flex: 1}}>
          <SkeletonContent
            containerStyle={theme.skeletonLeadersStyle}
            boneColor={theme.skeleton}
            highlightColor={theme.skeletonHighlight}
            animationDirection="horizontalLeft"
            layout={theme.leadersSkeleton}
          />
          <SkeletonContent
            containerStyle={theme.skeletonLeadersStyle}
            boneColor={theme.skeleton}
            highlightColor={theme.skeletonHighlight}
            animationDirection="horizontalLeft"
            layout={theme.leadersSkeleton}
          />
        </View>
      );
    }
    const {team, pointsLeader, reboundLeader, assistLeader} = this.state;
    return (
      <View style={{marginTop: 5}}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Player', pointsLeader.info)
          }>
          <StatLeader team={team} name="PTS" player={pointsLeader} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Player', reboundLeader.info)
          }>
          <StatLeader team={team} name="REB" player={reboundLeader} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Player', assistLeader.info)
          }>
          <StatLeader team={team} name="AST" player={assistLeader} />
        </TouchableOpacity>
      </View>
    );
  };

  renderTeamStats = scrollOpacity => {
    if (this.state.statsLoading) {
      return (
        <SkeletonContent
          containerStyle={theme.skeletonTeamRankStyle}
          boneColor={theme.skeleton}
          highlightColor={theme.skeletonHighlight}
          animationDirection="horizontalLeft"
          layout={theme.teamRankSkeleton}
        />
      );
    }
    const {teamStats} = this.state;
    return (
      <Animated.View
        style={[styles.row, {marginTop: 0, opacity: scrollOpacity}]}>
        <View style={styles.rankContainer}>
          <AnimatedText style={styles.rank}>
            {toRank(teamStats[52])}
          </AnimatedText>
          <AnimatedText weight={600} style={styles.rankName}>
            PTS
          </AnimatedText>
        </View>
        <View style={styles.rankContainer}>
          <AnimatedText style={styles.rank}>
            {toRank(teamStats[44])}
          </AnimatedText>
          <AnimatedText weight={600} style={styles.rankName}>
            REB
          </AnimatedText>
        </View>
        <View style={styles.rankContainer}>
          <AnimatedText style={styles.rank}>
            {toRank(teamStats[45])}
          </AnimatedText>
          <AnimatedText weight={600} style={styles.rankName}>
            AST
          </AnimatedText>
        </View>
        <View style={styles.rankContainer}>
          <AnimatedText style={styles.rank}>
            {toRank(teamStats[47])}
          </AnimatedText>
          <AnimatedText weight={600} style={styles.rankName}>
            STL
          </AnimatedText>
        </View>
        <View style={styles.rankContainer}>
          <AnimatedText style={styles.rank}>
            {toRank(teamStats[48])}
          </AnimatedText>
          <AnimatedText weight={600} style={styles.rankName}>
            BLK
          </AnimatedText>
        </View>
        <View style={styles.rankContainer}>
          <AnimatedText style={styles.rank}>
            {toRank(teamStats[35])}
          </AnimatedText>
          <AnimatedText weight={600} style={styles.rankName}>
            FG%
          </AnimatedText>
        </View>
      </Animated.View>
    );
  };

  renderStats = () => {
    if (this.state.statsLoading) {
      return (
        <SkeletonContent
          containerStyle={theme.skeletonTeamRankStyle}
          boneColor={theme.skeleton}
          highlightColor={theme.skeletonHighlight}
          animationDirection="horizontalLeft"
          layout={theme.teamRankSkeleton}
        />
      );
    }
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <StatsNbaHeaderTeam />
          <StatsNbaTeam stats={this.state.teamStats} />
        </View>
      </ScrollView>
    );
  };

  renderNews = () => {
    if (this.state.newsLoading) {
      return (
        <View style={{marginHorizontal: -24}}>
          <SkeletonContent
            containerStyle={theme.skeletonTeamRankStyle}
            boneColor={theme.skeleton}
            highlightColor={theme.skeletonHighlight}
            animationDirection="horizontalLeft"
            layout={theme.teamNewsSkeleton}
          />
        </View>
      );
    }
    const {news} = this.state;
    return (
      <View style={{marginHorizontal: -12}}>
        <NewsCover news={news[0]} />
      </View>
    );
  };

  renderRoster = () => {
    const {roster, rosterLoading, leadersLoading} = this.state;
    if (rosterLoading || leadersLoading) {
      return (
        <View style={{marginTop: 10, flex: 1}}>
          <SkeletonContent
            containerStyle={theme.skeletonLeadersStyle}
            boneColor={theme.skeleton}
            highlightColor={theme.skeletonHighlight}
            animationDirection="horizontalLeft"
            layout={theme.leadersSkeleton}
          />
          <SkeletonContent
            containerStyle={theme.skeletonLeadersStyle}
            boneColor={theme.skeleton}
            highlightColor={theme.skeletonHighlight}
            animationDirection="horizontalLeft"
            layout={theme.leadersSkeleton}
          />
        </View>
      );
    }
    return (
      <FlatList
        data={roster.slice(0, 5)}
        keyExtractor={item => item.personId}
        renderItem={this.renderPlayer}
      />
    );
  };

  renderPlayer = ({item, index}) => {
    const {team, players} = this.state;
    const details = getPlayerDetails(players, item.personId);
    let player = {
      info: details,
      value: moment().diff(details.dateOfBirthUTC, 'years'),
      // subinfo: `(${details.yearsPro} Years Pro)`,
    };
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({modalVisible: false});
          this.props.navigation.navigate('Player', details);
        }}>
        <StatLeader team={team} name="AGE" player={player} />
      </TouchableOpacity>
    );
  };

  renderOtherNews = ({item, index}) => {
    const article = {
      link: item.source,
      author: item.authors,
      title: item.title,
      image: item.cover,
      date: moment(item.date_time, 'MMM DD, hh:mma').format(
        'YYYY-MM-DD hh:mm:ss',
      ),
    };
    return <NewsFeed article={article} />;
  };

  renderModalContent = () => {
    const {modalContent} = this.state;
    if (modalContent === 'leaders') {
      const {
        team,
        pointsLeader,
        reboundLeader,
        assistLeader,
        stealLeader,
        blockLeader,
        fieldGoalLeader,
        threeLeader,
      } = this.state;
      return (
        <ScrollView>
          <AnimatedText weight={700} style={styles.modalHeader}>
            Team Leaders
          </AnimatedText>
          <StatLeader team={team} name="PTS" player={pointsLeader} />
          <StatLeader team={team} name="REB" player={reboundLeader} />
          <StatLeader team={team} name="AST" player={assistLeader} />
          <StatLeader team={team} name="STL" player={stealLeader} />
          <StatLeader team={team} name="BLK" player={blockLeader} />
          <StatLeader team={team} name="FG%" player={fieldGoalLeader} />
          <StatLeader team={team} name="3'S" player={threeLeader} />
        </ScrollView>
      );
    } else if (modalContent === 'roster') {
      const {roster} = this.state;
      return (
        <FlatList
          ListHeaderComponent={
            <AnimatedText weight={700} style={styles.modalHeader}>
              Team Roster
            </AnimatedText>
          }
          data={roster}
          keyExtractor={item => item.personId}
          renderItem={this.renderPlayer}
        />
      );
    } else if (modalContent === 'news') {
      const {news} = this.state;
      return (
        <FlatList
          ListHeaderComponent={
            <AnimatedText weight={700} style={styles.modalHeader}>
              Team News
            </AnimatedText>
          }
          data={news}
          keyExtractor={item => item.id}
          renderItem={this.renderOtherNews}
        />
      );
    }
  };

  openAdvancedStats() {
    const {team} = this.state;
    Linking.canOpenURL(
      `https://stats.nba.com/team/${team.teamId}/boxscores-scoring/`,
    )
      .then(supported => {
        if (!supported) {
          Alert.alert('We found no apps that can open this video');
        } else {
          return Linking.openURL(
            `https://stats.nba.com/team/${team.teamId}/boxscores-scoring/`,
          );
        }
      })
      .catch(err => console.error('An error occurred', err));
  }

  openSchedule() {
    const {team} = this.state;
    this.props.navigation.navigate('TeamSchedule', team);
    // Linking.canOpenURL(
    //   `https://stats.nba.com/schedule/#!?TeamID=${team.teamId}`,
    // )
    //   .then(supported => {
    //     reactotron.log(supported);
    //     if (!supported) {
    //       Alert.alert('We found no apps that can open this video');
    //     } else {
    //       return Linking.openURL(
    //         `https://stats.nba.com/schedule/#!?TeamID=${team.teamId}`,
    //       );
    //     }
    //   })
    //   .catch(err => console.error('An error occurred', err));
  }

  onScrollEndDrag = e => {
    let scrollY = e.nativeEvent.contentOffset.y;
    if (scrollY > headerHeight) {
      //do nothing
    } else if (headerHeight / 2.5 < scrollY) {
      //clamp up
      this.contentView.current.scrollTo({
        x: 0,
        y: headerHeight,
        animated: true,
      });
    } else {
      this.contentView.current.scrollTo({x: 0, y: 0, animated: true});
      //clamp down
    }
  };

  render() {
    const scrollOpacity = this.scrollY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const {team} = this.state;
    const teamImage = getTeamImage(team.triCode);
    return (
      <ScrollView
        ref={this.contentView}
        onScrollEndDrag={this.onScrollEndDrag}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: this.scrollY,
              },
            },
          },
        ])}
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <StatusBar backgroundColor={theme.cardBackground} />
        <Animated.View style={styles.header}>
          <Animated.View style={[styles.row, {opacity: scrollOpacity}]}>
            <Image source={teamImage} style={styles.teamImage} />
            <View style={styles.info}>
              <AnimatedText weight={600} style={styles.name}>
                {team.fullName}
              </AnimatedText>
              <AnimatedText style={styles.division}>
                {team.confName}ern, {team.divName}
              </AnimatedText>
            </View>
          </Animated.View>
          {this.renderTeamStats(scrollOpacity)}
          <Animated.View
            style={[styles.row, styles.buttons, {opacity: scrollOpacity}]}>
            <Button
              style={{marginRight: 10}}
              text="Team Schedule"
              handlePress={() => this.openSchedule()}
            />
            <Button
              text="Advanced Stats"
              handlePress={() => this.openAdvancedStats()}
            />
          </Animated.View>
        </Animated.View>
        <Card
          titleStyle={{marginBottom: 10}}
          title="Stats (Per Game)"
          style={{height: 100.857}}>
          {this.renderStats()}
        </Card>
        <Card
          titleStyle={{marginBottom: 10}}
          title="News"
          subtitle="See all"
          style={{height: 362.285}}
          handleMore={() =>
            this.setState({modalContent: 'news', modalVisible: true})
          }>
          {this.renderNews()}
        </Card>
        <Card
          titleBorder
          titleStyle={{marginBottom: 5}}
          title="Leaders"
          style={{height: 232.285}}
          handleMore={() =>
            this.setState({modalContent: 'leaders', modalVisible: true})
          }
          subtitle="See all">
          {this.renderLeaders()}
        </Card>
        <Card
          titleBorder
          titleStyle={{marginBottom: 5}}
          title="Roster"
          style={{height: 337.142}}
          handleMore={() =>
            this.setState({modalContent: 'roster', modalVisible: true})
          }
          subtitle="See all">
          {this.renderRoster()}
        </Card>
        <Modal
          useNativeDriver
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.setState({modalVisible: false})}
          style={styles.bottomModal}>
          <View style={styles.modalContent}>{this.renderModalContent()}</View>
        </Modal>
      </ScrollView>
    );
  }
}
