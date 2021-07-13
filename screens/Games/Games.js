import React, {Component} from 'react';
import {
  View,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styles} from './Games.styles';
import {getScoreboard} from './../../api/data.nba';
import {darkBackground} from '../../Theme';
import reactotron from 'reactotron-react-native';
import Loading from '../../components/Loading/Loading';
import Card from '../../components/Card/Card';
import Game from '../../components/Game/Game';
import {ScrollView} from 'react-native-gesture-handler';
import Empty from '../../components/Empty/Empty';
import ItemSeparator from '../../components/ItemSeparator';
import {sortBy} from 'underscore';
import Store from 'react-native-simple-store';
import {validatePurchase} from '../../utils/helper';
const dateFormat = 'YYYYMMDD';

export default class Games extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      games: null,
      loading: true,
      horizontalLayout: false,
      refreshing: false,
      dayFinished: false,
    };
    this.interval;
  }

  componentDidMount() {
    this.fetchScoreboard();
    this.interval = setInterval(
      () => {
        if (!this.state.dayFinished && this.props.tabLabel === 'TODAY') {
          this.setState({intervalRefreshing: true});
          this.fetchScoreboard();
        } else {
          clearInterval(this.interval);
        }
      },
      16000,
      1,
    );
  }

  fetchScoreboard() {
    const date = this.state.date.format(dateFormat);
    getScoreboard(date).then(response => {
      const games = sortBy(response.data.games, game => {
        return game.statusNum !== 2 && game.statusNum !== 1;
      });
      this.checkGamesStatus(games);
      this.setState({
        games: games,
        loading: false,
        intervalRefreshing: false,
        refreshing: false,
      });
    });
  }

  checkGamesStatus(games) {
    let dayDone = true;
    for (let i = 0; i < games.length; i++) {
      if (games[i].statusNum === 2) {
        dayDone = false;
        this.setState({dayFinished: false});
        break;
      }
    }
    if (dayDone) {
      clearInterval(this.interval);
    }
  }

  renderSeparator = () => {
    return <ItemSeparator />;
  };

  renderList = () => {
    return (
      <FlatList
        ItemSeparatorComponent={this.renderSeparator}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 5}}
        data={this.state.games}
        keyExtractor={item => item.gameId}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => this.handleGamePress(item)}>
            <Game showStanding game={item} />
          </TouchableOpacity>
        )}
      />
    );
  };

  renderRefreshing = () => {
    if (this.state.intervalRefreshing) {
      return (
        <ActivityIndicator
          style={styles.refreshIcon}
          size="small"
          color="#888"
        />
      );
    }
  };

  handleLayoutPress = () => {
    this.setState({horizontalLayout: !this.state.horizontalLayout});
  };

  handleGamePress(game) {
    validatePurchase('Game Details');
    if (game.statusNum === 1) {
      this.props.navigation.navigate('PreGame', game);
    } else {
      this.props.navigation.navigate('GameDetails', game);
    }
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.fetchScoreboard();
  }

  render() {
    if (this.state.loading) {
      return <Loading backgroundColor={darkBackground} />;
    }
    if (this.state.games.length === 0) {
      return (
        <View style={styles.container}>
          <Empty text="No games scheduled today." />
        </View>
      );
    }
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <Card titleBorder={true} title="Games">
          {this.renderList()}
          {this.renderRefreshing()}
        </Card>
      </ScrollView>
    );
  }
}
