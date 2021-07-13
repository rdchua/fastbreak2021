/* eslint-disable react-native/no-inline-styles */
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
import {styles} from './Player.styles';
import {getTeamDetails, validatePurchase} from '../../utils/helper';
import {headshot} from '../../api/data.nba';
import {getGameLog, getFantasyNews} from '../../api/stats.nba';
import {getPlayers, getPlayerProfile} from '../../api/data.nba';
import reactotron from 'reactotron-react-native';
import AnimatedText from '../../components/AnimatedText/AnimatedText';
import * as theme from '../../Theme';
import StatsNba from '../../components/Stats.Nba/Stats.nba';
import StatsNbaHeader from '../../components/Stats.Nba/StatsNbaHeader';
import StatsNbaAvg from '../../components/Stats.Nba/StatsNbaAvg';
import Card from '../../components/Card/Card';
import NewsText from '../../components/NewsText/NewsText';
import moment from 'moment';
import Button from '../../components/Button/Button';
import Store from 'react-native-simple-store';
import ItemSeparator from '../../components/ItemSeparator';
import Modal from 'react-native-modal';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
const headerHeight = 185;

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: this.props.navigation.state.params,
      logsLoading: true,
      avgLoading: true,
      newsLoading: true,
      profileLoading: true,
      myTeamButtonActive: false,
      myTeamButtonDisabled: true,
      advancedStatsButtonActive: false,
      modalVisible: false,
    };
    this.contentView = React.createRef();
    this.scrollY = new Animated.Value(0);
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    validatePurchase('Game Details');
    this.fetchGameLog();
    this.fetchSeasonAvg();
    this.fetchNews();
    this.fetchProfile();
    this.isPlayer();
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
            {params.firstName} {params.lastName}
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

  isPlayer() {
    Store.get('myTeam').then(myTeam => {
      reactotron.log(myTeam);
      if (!myTeam) {
        this.setState({myTeamButtonDisabled: false});
      } else {
        const isPlayer = myTeam.find(player => {
          return player.personId === this.state.player.personId;
        });
        if (isPlayer) {
          this.setState({
            myTeamButtonActive: true,
            myTeamButtonDisabled: false,
          });
        } else {
          this.setState({myTeamButtonDisabled: false});
        }
      }
    });
  }

  fetchGameLog() {
    const {player} = this.state;
    getGameLog(player.personId, 'Regular Season').then(response => {
      reactotron.log(response);
      this.setState({
        logs: response.data.resultSets[0].rowSet,
        logsLoading: false,
      });
    });
  }

  fetchSeasonAvg() {
    const {player} = this.state;
    getPlayerProfile(this.global.seasonYear, player.personId).then(response => {
      reactotron.log(response.data.league.standard.stats);
      this.setState({
        seasonAvgs: response.data.league.standard.stats.regularSeason.season,
        avgLoading: false,
      });
    });
    // getSeasonAvg(player.personId).then(response => {
    //   this.setState({
    //     seasonAvgs: response.data.resultSets[1].rowSet,
    //     avgLoading: false,
    //   });
    // });
  }

  fetchNews() {
    const {player} = this.state;
    getFantasyNews(player.firstName, player.lastName).then(response => {
      this.setState({
        news: response.data.PlayerRotowires,
        newsLoading: false,
      });
    });
  }

  fetchProfile() {
    const {player} = this.state;
    getPlayers(this.global.seasonYear).then(response => {
      const players = response.data.league.standard;
      const profile = players.find(person => {
        return person.personId === player.personId;
      });
      this.setState({profileLoading: false, profile: profile});
    });
  }

  renderGames = ({item, index}) => {
    return <StatsNba stats={item} />;
  };

  renderSeasonAvg = ({item, index}) => {
    return <StatsNbaAvg title={item.seasonYear} stats={item.total} />;
  };

  renderNewsItem = ({item, index}) => {
    reactotron.log(item);
    let article = {
      title: item.Headline,
      date: moment(item.ListItemPubDate, 'MM/DD/YYYY hh:mm:ss a').format(
        'dddd, MMM DD YYYY hh:mm a',
      ),
      caption: item.ListItemCaption,
      description: item.ListItemDescription,
      injured: item.Injured,
      injuryStatus: item.Injured_Status,
      rotowire: true,
      author: 'Rotowire',
      authorTitle: '',
    };
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Article', article)}
        style={{paddingTop: index !== 0 ? 10 : 0, paddingBottom: 10}}>
        <NewsText icon title={item.Headline} body={item.ListItemCaption} />
      </TouchableOpacity>
    );
  };

  renderNews = () => {
    const {news, newsLoading} = this.state;
    if (newsLoading) {
      return (
        <SkeletonContent
          containerStyle={theme.skeletonStyle}
          boneColor={theme.skeleton}
          highlightColor={theme.skeletonHighlight}
          animationDirection="horizontalLeft"
          layout={theme.newsTextSkeleton}
        />
      );
    } else if (news.length === 0) {
      return <AnimatedText style={styles.empty}>No Recent News</AnimatedText>;
    } else {
      return (
        <FlatList
          ItemSeparatorComponent={() => <ItemSeparator />}
          data={news.slice(0, 6)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderNewsItem}
        />
      );
    }
  };

  handlePress() {
    const {player} = this.state;
    Store.get('myTeam').then(team => {
      if (!team) {
        Store.push('myTeam', player);
        reactotron.log(
          `${player.firstName} ${player.lastName} was added to your team.`,
        );
        this.setState({myTeamButtonActive: true});
      } else {
        reactotron.log(team);
        const exists = team.find(obj => {
          return obj.personId === player.personId;
        });
        reactotron.log(`does this player exist? ${exists}`);
        if (!exists) {
          Store.push('myTeam', player);
          reactotron.log(
            `${player.firstName} ${player.lastName} was added to your team.`,
          );
          this.setState({myTeamButtonActive: true});
        } else {
          reactotron.log(
            `${player.firstName} ${player.lastName} is already in your team.`,
          );
          const newTeam = team.filter(obj => {
            return obj.personId !== player.personId;
          });
          Store.delete('myTeam');
          Store.save('myTeam', newTeam);
          this.setState({myTeamButtonActive: false});
        }
      }
    });
  }

  renderProfile = () => {
    if (this.state.profileLoading) {
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
    const {profile} = this.state;
    return (
      <View style={[styles.row, {marginTop: 15}]}>
        <View style={styles.rankContainer}>
          <AnimatedText style={styles.rank}>
            {profile.heightFeet}' {profile.heightInches}''
          </AnimatedText>
          <AnimatedText weight={600} style={styles.rankName}>
            Height
          </AnimatedText>
        </View>
        <View style={styles.rankContainer}>
          <AnimatedText style={styles.rank}>
            {profile.weightPounds} lbs
          </AnimatedText>
          <AnimatedText weight={600} style={styles.rankName}>
            Weight
          </AnimatedText>
        </View>
        <View style={styles.rankContainer}>
          <AnimatedText style={styles.rank}>
            {moment().diff(profile.dateOfBirthUTC, 'years')}
          </AnimatedText>
          <AnimatedText weight={600} style={styles.rankName}>
            Age
          </AnimatedText>
        </View>
        <View style={styles.rankContainer}>
          <AnimatedText numberOfLines={1} style={styles.rank}>
            {profile.country}
          </AnimatedText>
          <AnimatedText weight={600} style={styles.rankName}>
            Country
          </AnimatedText>
        </View>
        <View style={styles.rankContainer}>
          <AnimatedText style={styles.rank}>
            {profile.nbaDebutYear}
          </AnimatedText>
          <AnimatedText weight={600} style={styles.rankName}>
            Debut
          </AnimatedText>
        </View>
        <View style={styles.rankContainer}>
          <AnimatedText style={styles.rank}>{profile.yearsPro}</AnimatedText>
          <AnimatedText weight={600} style={styles.rankName}>
            Exp
          </AnimatedText>
        </View>
      </View>
    );
  };

  openAdvancedStats() {
    const {player} = this.state;
    Linking.canOpenURL(
      `https://stats.nba.com/player/${player.personId}/boxscores-advanced/`,
    )
      .then(supported => {
        reactotron.log(supported);
        if (!supported) {
          Alert.alert('We found no apps that can open this video');
        } else {
          return Linking.openURL(
            `https://stats.nba.com/player/${
              player.personId
            }/boxscores-advanced/`,
          );
        }
      })
      .catch(err => console.error('An error occurred', err));
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

  renderAverage = () => {
    const {avgLoading, seasonAvgs} = this.state;
    if (avgLoading) {
      return (
        <SkeletonContent
          containerStyle={theme.skeletonLogsStyle}
          boneColor={theme.skeleton}
          highlightColor={theme.skeletonHighlight}
          animationDirection="horizontalLeft"
          layout={theme.playerLogsSkeleton}
        />
      );
    }
    return (
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        <FlatList
          data={seasonAvgs.slice(0, 3)}
          ItemSeparatorComponent={() => <ItemSeparator />}
          ListHeaderComponent={<StatsNbaHeader title="Regular Season" />}
          keyExtractor={item => item.seasonYear}
          renderItem={this.renderSeasonAvg}
        />
      </ScrollView>
    );
  };

  renderLogs = () => {
    const {logsLoading, logs} = this.state;
    if (logsLoading) {
      return (
        <SkeletonContent
          containerStyle={[theme.skeletonLogsStyle, {marginTop: -30}]}
          boneColor={theme.skeleton}
          highlightColor={theme.skeletonHighlight}
          animationDirection="horizontalLeft"
          layout={theme.playerLogsSkeleton}
        />
      );
    }
    return (
      <ScrollView
        style={{marginTop: 15}}
        showsHorizontalScrollIndicator={false}
        horizontal={true}>
        <FlatList
          data={logs.slice(0, 3)}
          ItemSeparatorComponent={() => <ItemSeparator />}
          ListHeaderComponent={<StatsNbaHeader title="Recent Games" />}
          keyExtractor={item => item[2]}
          renderItem={this.renderGames}
        />
      </ScrollView>
    );
  };

  renderInjury() {
    const {news, newsLoading} = this.state;
    if (newsLoading || !news[0]) {
      return '';
    } else if (news[0].Injured === 'YES' && news[0].Injured) {
      return ` ${news[0].Injured_Status}`;
    } else {
      return ``;
    }
  }

  render() {
    const {player, logs, myTeamButtonActive} = this.state;
    const scrollOpacity = this.scrollY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const team = getTeamDetails(player.teamId);
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
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <StatusBar backgroundColor={theme.cardBackground} />
        <Animated.View style={[styles.header, {opacity: scrollOpacity}]}>
          <View style={styles.row}>
            <Image
              source={{uri: headshot(player.personId)}}
              style={[styles.headshot, {backgroundColor: team.primaryColor}]}
            />
            {/* <Image source={teamImage} style={styles.teamImage} /> */}
            <View style={styles.info}>
              <AnimatedText weight={600} style={styles.name}>
                {player.firstName} {player.lastName}
                <AnimatedText style={styles.injury}>
                  {this.renderInjury()}
                </AnimatedText>
              </AnimatedText>
              <AnimatedText style={styles.teamName}>
                {team.altCityName} {team.nickName}
              </AnimatedText>
              <AnimatedText style={styles.number}>
                #{player.jersey} - {player.pos}
              </AnimatedText>
            </View>
          </View>
          <View style={[styles.row, styles.buttons]}>
            <Button
              active={myTeamButtonActive}
              handlePress={() => this.handlePress()}
              style={{marginRight: 10}}
              text={
                myTeamButtonActive ? 'Remove from my team' : 'Add to My Team'
              }
            />
            <Button
              text="Advanced Stats"
              handlePress={() => this.openAdvancedStats()}
            />
          </View>
          {this.renderProfile()}
        </Animated.View>
        <Card
          titleStyle={{marginBottom: 10}}
          title="stats"
          style={{height: 328.714}}
          subtitle="Game Log"
          handleMore={() => this.setState({modalVisible: true})}>
          {this.renderAverage()}
          {this.renderLogs()}
        </Card>
        <Card titleStyle={{marginTop: 5}} style={{marginTop: 5}}>
          {this.renderNews()}
        </Card>
        <Modal
          useNativeDriver
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.setState({modalVisible: false})}
          style={styles.bottomModal}>
          <View style={styles.modalContent}>
            <AnimatedText weight={700} style={styles.modalHeader}>
              Game Logs
            </AnimatedText>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              <FlatList
                data={logs}
                ItemSeparatorComponent={() => <ItemSeparator />}
                ListHeaderComponent={<StatsNbaHeader title="Game" />}
                keyExtractor={item => item[2]}
                renderItem={this.renderGames}
              />
            </ScrollView>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}
