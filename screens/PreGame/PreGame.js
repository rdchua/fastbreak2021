import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {styles} from './PreGame.styles';
import {
  getBoxscore,
  getTeamLeaders,
  getPreviewArticle,
  getPlayers,
  headshot,
} from '../../api/data.nba';
import {cardBackground} from '../../Theme';
import {
  getTeamImage,
  getTeamDetails,
  getPlayerDetails,
} from './../../utils/helper';
import Animated from 'react-native-reanimated';
import reactotron from 'reactotron-react-native';
import AnimatedText from '../../components/AnimatedText/AnimatedText';
import moment from 'moment';
import Card from '../../components/Card/Card';
import TeamStat from '../../components/TeamStat/TeamStat';
import Loading from '../../components/Loading/Loading';
import NewsText from '../../components/NewsText/NewsText';
import PlayerComapare from '../../components/PlayerCompare/PlayerComapare';
export default class PreGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: this.props.navigation.state.params,
      prevMatchupLoading: true,
      recapLoading: true,
      playersLoading: true,
      leadersLoading: true,
    };
  }

  componentDidMount() {
    this.fetchPreviousMatchup();
    this.fetchTeamLeaders();
    this.fetchPreviewArticle();
    this.fetchPlayers();
  }

  fetchPlayers() {
    getPlayers().then(response => {
      reactotron.log(response);
      this.setState({
        players: response.data.league.standard,
        playersLoading: false,
      });
    });
  }

  fetchPreviewArticle() {
    const {game} = this.state;
    getPreviewArticle(game.startDateEastern, game.gameId)
      .then(response => {
        reactotron.log('previwe article', response);
        this.setState({
          recapLoading: false,
          article: response.data,
        });
      })
      .catch(err => {
        reactotron.log(err);
        this.setState({recapLoading: false, article: null});
      });
  }

  fetchTeamLeaders() {
    const {game} = this.state;
    const homeTeam = getTeamDetails(game.hTeam.teamId);
    const awayTeam = getTeamDetails(game.vTeam.teamId);
    Promise.all([
      getTeamLeaders(homeTeam.urlName),
      getTeamLeaders(awayTeam.urlName),
    ]).then(response => {
      reactotron.log(response[0].data.league.standard);
      this.setState({
        leadersLoading: false,
        homeLeaders: response[0].data.league.standard,
        awayLeaders: response[1].data.league.standard,
      });
    });
  }

  fetchPreviousMatchup() {
    const {game} = this.state;
    getBoxscore(game.startDateEastern, game.gameId).then(response => {
      getBoxscore(
        response.data.previousMatchup.gameDate,
        response.data.previousMatchup.gameId,
      ).then(previousMatchup => {
        reactotron.log('prev', previousMatchup);
        this.setState({
          homeTeamStats: previousMatchup.data.stats.hTeam,
          awayTeamStats: previousMatchup.data.stats.vTeam,
          prevMatchupLoading: false,
        });
      });
    });
  }

  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    reactotron.log(params);
    return {
      headerTitle: (
        <Animated.View>
          <AnimatedText weight={700} style={styles.headerTitle}>
            {params.hTeam.triCode} vs {params.vTeam.triCode}
          </AnimatedText>
        </Animated.View>
      ),
      headerStyle: {
        elevation: 0,
        backgroundColor: cardBackground,
      },
      headerTintColor: '#fff',
    };
  };

  renderRecapArticle = () => {
    const {article} = this.state;
    if (this.state.recapLoading) {
      return <Loading size="small" />;
    }
    return article ? (
      <NewsText title={article.title} body={article.paragraphs[0].paragraph} />
    ) : (
      <NewsText title="" body="No Preview Article" />
    );
  };

  renderGameClock = () => {
    const {game} = this.state;
    const startTime = moment(game.startTimeUTC).format('hh:mm');
    const startTimeA = moment(game.startTimeUTC).format('A');
    const startDate = moment(game.startTimeUTC).format('MMM DD, YYYY');
    return (
      <View>
        <AnimatedText style={styles.startTime}>
          {startTime}
          <AnimatedText style={styles.startTimeA}>{startTimeA}</AnimatedText>
        </AnimatedText>
        <AnimatedText style={styles.date}>{startDate}</AnimatedText>
      </View>
    );
  };

  renderLeaders = () => {
    const {
      homeLeaders,
      awayLeaders,
      players,
      playersLoading,
      leadersLoading,
    } = this.state;
    if (playersLoading || leadersLoading) {
      return <Loading size="small" />;
    }
    const homeLeaderPoints = getPlayerDetails(
      players,
      homeLeaders.ppg[0].personId,
    );
    const homeLeaderRebounds = getPlayerDetails(
      players,
      homeLeaders.trpg[0].personId,
    );
    const homeLeaderAssist = getPlayerDetails(
      players,
      homeLeaders.apg[0].personId,
    );
    const awayLeaderPoints = getPlayerDetails(
      players,
      awayLeaders.ppg[0].personId,
    );
    const awayLeaderRebounds = getPlayerDetails(
      players,
      awayLeaders.trpg[0].personId,
    );
    const awayLeaderAssist = getPlayerDetails(
      players,
      awayLeaders.apg[0].personId,
    );
    const homeTeam = getTeamDetails(homeLeaderPoints.teamId);
    const awayTeam = getTeamDetails(awayLeaderPoints.teamId);
    return (
      <View>
        <PlayerComapare
          homePlayer={homeLeaderPoints}
          awayPlayer={awayLeaderPoints}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          homeValue={homeLeaders.ppg[0].value}
          awayValue={awayLeaders.ppg[0].value}
          label="PPG"
        />
        <PlayerComapare
          homePlayer={homeLeaderRebounds}
          awayPlayer={awayLeaderRebounds}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          homeValue={homeLeaders.trpg[0].value}
          awayValue={awayLeaders.trpg[0].value}
          label="RPG"
        />
        <PlayerComapare
          homePlayer={homeLeaderAssist}
          awayPlayer={awayLeaderAssist}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          homeValue={homeLeaders.apg[0].value}
          label="APG"
          awayValue={awayLeaders.apg[0].value}
        />
      </View>
    );
  };

  renderTeamStats = (homeTeamColor, awayTeamColor, awayTeam, homeTeam) => {
    const {homeTeamStats, awayTeamStats} = this.state;
    if (this.state.prevMatchupLoading || (!homeTeamStats && !awayTeamStats)) {
      return <Loading size="small" />;
    } else {
      return (
        <View>
          <View style={[styles.row, {marginTop: 15}]}>
            <AnimatedText style={styles.teamNameSmall}>
              {awayTeam.triCode} {awayTeam.nickName} -{' '}
              {awayTeamStats.totals.points}
            </AnimatedText>
            <AnimatedText style={[styles.teamNameSmall, {textAlign: 'right'}]}>
              {homeTeamStats.totals.points} - {homeTeam.triCode}{' '}
              {homeTeam.nickName}
            </AnimatedText>
          </View>
          <View style={styles.teamStatsContainer}>
            <TeamStat
              name="Field Goals"
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
              homeTeamStat={homeTeamStats.totals.fgm}
              homeTeamStat2={homeTeamStats.totals.fga}
              awayTeamStat={awayTeamStats.totals.fgm}
              awayTeamStat2={awayTeamStats.totals.fga}
            />
            <TeamStat
              name="3 Pointers"
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
              homeTeamStat={homeTeamStats.totals.tpm}
              homeTeamStat2={homeTeamStats.totals.tpa}
              awayTeamStat={awayTeamStats.totals.tpm}
              awayTeamStat2={awayTeamStats.totals.tpa}
            />
            <TeamStat
              name="Free Throws"
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
              homeTeamStat={homeTeamStats.totals.ftm}
              homeTeamStat2={homeTeamStats.totals.fta}
              awayTeamStat={awayTeamStats.totals.ftm}
              awayTeamStat2={awayTeamStats.totals.fta}
            />
            <TeamStat
              name="Rebounds"
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
              homeTeamStat={homeTeamStats.totals.totReb}
              awayTeamStat={awayTeamStats.totals.totReb}
            />
            <TeamStat
              name="Offensive Rebounds"
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
              homeTeamStat={homeTeamStats.totals.offReb}
              awayTeamStat={awayTeamStats.totals.offReb}
            />
            <TeamStat
              name="Defensive Rebounds"
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
              homeTeamStat={homeTeamStats.totals.defReb}
              awayTeamStat={awayTeamStats.totals.defReb}
            />
            <TeamStat
              name="Assists"
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
              homeTeamStat={homeTeamStats.totals.assists}
              awayTeamStat={awayTeamStats.totals.assists}
            />
            <TeamStat
              name="Steals"
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
              homeTeamStat={homeTeamStats.totals.steals}
              awayTeamStat={awayTeamStats.totals.steals}
            />
            <TeamStat
              name="Blocks"
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
              homeTeamStat={homeTeamStats.totals.blocks}
              awayTeamStat={awayTeamStats.totals.blocks}
            />
            <TeamStat
              name="Turnovers"
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
              homeTeamStat={homeTeamStats.totals.turnovers}
              awayTeamStat={awayTeamStats.totals.turnovers}
            />
            <TeamStat
              name="Fouls"
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
              homeTeamStat={homeTeamStats.totals.pFouls}
              awayTeamStat={awayTeamStats.totals.pFouls}
            />
          </View>
        </View>
      );
    }
  };

  handleTeamPress(team) {
    this.props.navigation.navigate('Team', team);
  }

  render() {
    const {game} = this.state;
    const homeTeamImage = getTeamImage(game.hTeam.triCode);
    const awayTeamImage = getTeamImage(game.vTeam.triCode);
    const homeTeam = getTeamDetails(game.hTeam.teamId);
    const awayTeam = getTeamDetails(game.vTeam.teamId);
    const homeTeamStanding = `${game.hTeam.win} - ${game.hTeam.loss}`;
    const awayTeamStanding = `${game.vTeam.win} - ${game.vTeam.loss}`;
    const homeTeamScore = game.hTeam.score;
    const awayTeamScore = game.vTeam.score;
    return (
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor={cardBackground} />
        <View style={[styles.row, styles.scoreContainer]}>
          <TouchableOpacity
            onPress={() => this.handleTeamPress(awayTeam)}
            style={styles.teamInfo}>
            <Image style={styles.teamImage} source={awayTeamImage} />
            <AnimatedText numberOfLines={1} style={styles.teamName}>
              {awayTeam.triCode} {awayTeam.nickName}
            </AnimatedText>
            <AnimatedText style={styles.teamStanding}>
              ({awayTeamStanding})
            </AnimatedText>
          </TouchableOpacity>
          <View style={[styles.row, styles.scoreboard]}>
            <AnimatedText style={styles.teamScore}></AnimatedText>
            {this.renderGameClock()}
            <AnimatedText style={styles.teamScore}></AnimatedText>
          </View>
          <TouchableOpacity
            onPress={() => this.handleTeamPress(homeTeam)}
            style={styles.teamInfo}>
            <Image style={styles.teamImage} source={homeTeamImage} />
            <AnimatedText numberOfLines={1} style={styles.teamName}>
              {homeTeam.triCode} {homeTeam.nickName}
            </AnimatedText>
            <AnimatedText style={styles.teamStanding}>
              ({homeTeamStanding})
            </AnimatedText>
          </TouchableOpacity>
        </View>
        <Card>{this.renderRecapArticle()}</Card>
        <Card titleStyle={{marginBottom: 10}} title="Leaders">
          {this.renderLeaders()}
        </Card>
        <Card title="Previous matchup">
          {this.renderTeamStats(
            awayTeam.primaryColor,
            homeTeam.primaryColor,
            awayTeam,
            homeTeam,
          )}
        </Card>
      </ScrollView>
    );
  }
}
