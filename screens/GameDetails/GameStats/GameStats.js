/* eslint-disable radix */
import React, {Component} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {styles} from './GameStats.styles';
import AnimatedText from '../../../components/AnimatedText/AnimatedText';
import reactotron from 'reactotron-react-native';
import {getTeamImage, getTeamDetails} from './../../../utils/helper';
import moment from 'moment';
import Card from '../../../components/Card/Card';
import {
  getRecapArticle,
  getBoxscore,
  getPreviewArticle,
} from '../../../api/data.nba';
import Loading from '../../../components/Loading/Loading';
import GameLeader from '../../../components/GameLeader/GameLeader';
import TeamStat from '../../../components/TeamStat/TeamStat';
import NewsText from '../../../components/NewsText/NewsText';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {
  skeleton,
  skeletonStyle,
  skeletonHighlight,
  screenWidth,
  newsTextSkeleton,
  leadersSkeleton,
  skeletonLeadersStyle,
  skeletonTeamStatsStyle,
  teamStatsSkeleton,
} from '../../../Theme';

export default class GameStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: this.props.gameDetails,
      recapLoading: true,
      boxscoreLoading: true,
    };
    this.contentView = React.createRef();
    this.interval;
  }

  componentDidMount() {
    reactotron.log('moutning stats');
    this.getRecapArticle();
    this.getBoxscore();
    this.interval = setInterval(
      () => {
        const {game} = this.state;
        if (game.statusNum === 2) {
          this.getBoxscore();
        } else {
          clearInterval(this.interval);
        }
      },
      16000,
      1,
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getRecapArticle() {
    const {game} = this.state;
    if (game.statusNum !== 3) {
      getPreviewArticle(game.startDateEastern, game.gameId)
        .then(response => {
          this.setState({recapArticle: response.data, recapLoading: false});
        })
        .catch(_err => {
          this.setState({recapArticle: null, recapLoading: false});
        });
    } else {
      getRecapArticle(game.startDateEastern, game.gameId)
        .then(response => {
          this.setState({recapArticle: response.data, recapLoading: false});
        })
        .catch(_err => {
          this.setState({recapArticle: null, recapLoading: false});
        });
    }
  }

  getBoxscore() {
    reactotron.log('fetching game details');
    const {game} = this.state;
    getBoxscore(game.startDateEastern, game.gameId).then(response => {
      const players = response.data.stats.activePlayers;
      const leaders = this.getLeaders(
        players,
        game.hTeam.teamId,
        game.vTeam.teamId,
      );
      this.setState({
        homeTeamStats: response.data.stats.hTeam,
        awayTeamStats: response.data.stats.vTeam,
        boxscore: response.data.stats.activePlayers,
        boxscoreLoading: false,
        homeTeamLeader: leaders.homeTeamLeader,
        awayTeamLeader: leaders.awayTeamLeader,
        refreshing: false,
      });
    });
  }

  getLeaders(players, hTeamId, vTeamId) {
    let hLeader, vLeader;
    players.forEach(player => {
      if (player.teamId === hTeamId) {
        if (hLeader) {
          let currPer = this.calculateStats(player);
          if (currPer > hLeader.per) {
            player.per = currPer;
            hLeader = player;
          }
        } else {
          player.per = this.calculateStats(player);
          hLeader = player;
        }
      } else if (player.teamId === vTeamId) {
        if (vLeader) {
          let currPer = this.calculateStats(player);
          if (currPer > vLeader.per) {
            player.per = currPer;
            vLeader = player;
          }
        } else {
          player.per = this.calculateStats(player);
          vLeader = player;
        }
      }
    });
    return {
      homeTeamLeader: hLeader,
      awayTeamLeader: vLeader,
    };
  }

  renderGameClock = () => {
    const {game} = this.state;
    const startTime = moment(game.startTimeUTC).format('hh:mm');
    const startTimeA = moment(game.startTimeUTC).format('A');
    const startDate = moment(game.startTimeUTC).format('MMM DD, YYYY');
    if (game.statusNum === 1 && game.hTeam.score === '') {
      return (
        <View>
          <AnimatedText style={styles.startTime}>
            {startTime}
            <AnimatedText style={styles.startTimeA}>{startTimeA}</AnimatedText>
          </AnimatedText>
          <AnimatedText style={styles.date}>{startDate}</AnimatedText>
        </View>
      );
    } else if (game.statusNum === 2) {
      if (game.period.isHalfTime) {
        return <AnimatedText style={styles.gameClock}>HALF</AnimatedText>;
      } else if (game.period.isEndOfPeriod) {
        return (
          // eslint-disable-next-line prettier/prettier
          <AnimatedText
            style={
              styles.gameClock
            }>{`END OF Q${game.period.current}`}</AnimatedText>
        );
      }
      return (
        <AnimatedText style={styles.gameClock}>
          {game.period.current > 4
            ? `${game.period.current % 4} OT ${game.clock}`
            : `Q${game.period.current} ${game.clock}`}
        </AnimatedText>
      );
    } else if (game.statusNum === 3) {
      return (
        <AnimatedText style={styles.gameClock}>
          {game.period.current > 4
            ? `FINAL OT ${game.period.current % 4}`
            : 'FINAL'}
        </AnimatedText>
      );
    } else {
      return <AnimatedText style={styles.gameClock}> </AnimatedText>;
    }
  };

  renderRecapArticle = () => {
    const {recapArticle, recapLoading} = this.state;
    return (
      <SkeletonContent
        containerStyle={skeletonStyle}
        boneColor={skeleton}
        isLoading={recapLoading}
        highlightColor={skeletonHighlight}
        layout={newsTextSkeleton}>
        {recapArticle ? (
          <NewsText
            title={recapArticle.title}
            body={recapArticle.paragraphs[3].paragraph}
          />
        ) : (
          <NewsText title="" body="No Article" />
        )}
      </SkeletonContent>
    );
  };

  handlePlayerPress(player) {
    this.props.navigation.navigate('Player', player);
  }

  renderLeaders = () => {
    const {homeTeamLeader, awayTeamLeader, boxscoreLoading} = this.state;
    return (
      <View style={{flex: 1}}>
        <SkeletonContent
          isLoading={boxscoreLoading}
          containerStyle={skeletonLeadersStyle}
          boneColor={skeleton}
          highlightColor={skeletonHighlight}
          layout={leadersSkeleton}>
          <GameLeader
            handlePress={() => this.handlePlayerPress(awayTeamLeader)}
            player={awayTeamLeader}
          />
        </SkeletonContent>
        <SkeletonContent
          isLoading={boxscoreLoading}
          containerStyle={skeletonLeadersStyle}
          boneColor={skeleton}
          highlightColor={skeletonHighlight}
          layout={leadersSkeleton}>
          <GameLeader
            handlePress={() => this.handlePlayerPress(homeTeamLeader)}
            player={homeTeamLeader}
          />
        </SkeletonContent>
      </View>
    );
  };

  renderTeamStats = (homeTeamColor, awayTeamColor) => {
    const {homeTeamStats, awayTeamStats} = this.state;
    if (this.state.boxscoreLoading || (!homeTeamStats && !awayTeamStats)) {
      return (
        <View>
          <SkeletonContent
            containerStyle={skeletonTeamStatsStyle}
            boneColor={skeleton}
            highlightColor={skeletonHighlight}
            layout={teamStatsSkeleton}
          />
          <SkeletonContent
            containerStyle={skeletonTeamStatsStyle}
            boneColor={skeleton}
            highlightColor={skeletonHighlight}
            layout={teamStatsSkeleton}
          />
          <SkeletonContent
            containerStyle={skeletonTeamStatsStyle}
            boneColor={skeleton}
            highlightColor={skeletonHighlight}
            layout={teamStatsSkeleton}
          />
        </View>
      );
    } else {
      return (
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
      );
    }
  };

  calculateStats(player) {
    return (
      parseInt(player.points) +
      parseInt(player.totReb) +
      1.4 * parseInt(player.assists) +
      parseInt(player.steals) +
      1.4 * parseInt(player.blocks) -
      0.7 * parseInt(player.turnovers) +
      parseInt(player.fgm) +
      0.5 * parseInt(player.tpm) -
      0.8 * (parseInt(player.fga) - parseInt(player.fgm)) +
      0.25 * parseInt(player.ftm) -
      0.8 * (parseInt(player.fta) - parseInt(player.ftm))
    );
  }

  handleTeamPress(team) {
    this.props.navigation.navigate('Team', team);
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.getBoxscore();
  }

  onScrollEndDrag = e => {
    let scrollY = e.nativeEvent.contentOffset.y;
    if (scrollY > this.props.headerHeight) {
      //do nothing
    } else if (this.props.headerHeight / 2 < scrollY) {
      //clamp up
      this.contentView.current.scrollTo({
        x: 0,
        y: this.props.headerHeight,
        animated: true,
      });
    } else {
      this.contentView.current.scrollTo({x: 0, y: 0, animated: true});
      //clamp down
    }
  };

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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
        ref={this.contentView}
        onScrollEndDrag={this.onScrollEndDrag}
        onScroll={this.props.handleScroll}
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
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
            <AnimatedText style={styles.teamScore}>
              {awayTeamScore}
            </AnimatedText>
            {this.renderGameClock()}
            <AnimatedText style={styles.teamScore}>
              {homeTeamScore}
            </AnimatedText>
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
        <Card title="LEADERS" style={{height: 208.85}}>
          {this.renderLeaders()}
        </Card>
        <Card title="TEAM STATS" style={{height: 595.71}}>
          <View style={[styles.row, {marginTop: 15}]}>
            <AnimatedText style={styles.teamNameSmall}>
              {awayTeam.triCode} {awayTeam.nickName}
            </AnimatedText>
            <AnimatedText style={[styles.teamNameSmall, {textAlign: 'right'}]}>
              {homeTeam.triCode} {homeTeam.nickName}
            </AnimatedText>
          </View>
          {this.renderTeamStats(awayTeam.primaryColor, homeTeam.primaryColor)}
        </Card>
      </ScrollView>
    );
  }
}
