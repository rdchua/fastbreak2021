import React, {Component} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {styles} from './TeamSchedule.styles';
import {getTeamSchedule} from '../../api/data.nba';
import reactotron from 'reactotron-react-native';
import Loading from '../../components/Loading/Loading';
import {darkBackground, cardBackground} from '../../Theme';
import AnimatedText from '../../components/AnimatedText/AnimatedText';
import moment from 'moment-timezone';
import {getTeamImage, getTeamDetails} from '../../utils/helper';
import {sortBy} from 'underscore';
import firebase from 'react-native-firebase';
export default class TeamSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: this.props.navigation.state.params,
      loading: true,
    };
  }
  componentDidMount() {
    this.getSchedule();
  }

  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params;
    const teamDetails = getTeamDetails(params.teamId);
    reactotron.log('param', params);
    return {
      headerTitle: (
        <View style={{flex: 1}}>
          <AnimatedText weight={700} style={styles.headerTitle}>
            {teamDetails.triCode} {teamDetails.nickName}'s Schedule
          </AnimatedText>
        </View>
      ),
      headerStyle: {
        elevation: 0,
        backgroundColor: cardBackground,
      },
      headerTintColor: '#fff',
    };
  };

  getSchedule() {
    const {team} = this.state;
    getTeamSchedule(team.urlName).then(response => {
      reactotron.log(response);
      this.setState({
        loading: false,
        games: sortBy(response.data.league.standard, game => {
          return game.statusNum;
        }),
      });
    });
  }

  renderScore = item => {
    if (item.statusNum === 3) {
      if (item.isHomeTeam) {
        return item.hTeam.score > item.vTeam.score
          ? `W ${item.hTeam.score} - ${item.vTeam.score}`
          : `L ${item.hTeam.score} - ${item.vTeam.score}`;
      } else {
        return item.vTeam.score > item.hTeam.score
          ? `W ${item.vTeam.score} - ${item.hTeam.score}`
          : `L ${item.vTeam.score} - ${item.hTeam.score}`;
      }
    } else {
      return moment(item.startTimeUTC).format('hh:mm a');
    }
  };

  renderGame = ({item, index}) => {
    reactotron.log(item);
    const againstTeamDetails = getTeamDetails(
      item.isHomeTeam ? item.vTeam.teamId : item.hTeam.teamId,
    );
    const againstTeamImage = getTeamImage(againstTeamDetails.triCode);
    return (
      <View>
        <View
          onPress={() => this.handleGamePress(item)}
          style={[
            styles.row,
            styles.gameContainer,
            {backgroundColor: index % 2 === 0 ? '#181818' : null},
          ]}>
          <AnimatedText style={[styles.text, styles.left]} weight={600}>
            {moment(item.startTimeUTC).format('ddd, MMM DD')}
          </AnimatedText>
          <View style={[styles.row, styles.center]}>
            <AnimatedText style={styles.text} weight={600}>
              {item.isHomeTeam ? 'vs' : '@'}
            </AnimatedText>
            <Image source={againstTeamImage} style={styles.teamImage} />
            <AnimatedText style={styles.text} weight={600}>
              {item.isHomeTeam
                ? againstTeamDetails.triCode
                : againstTeamDetails.triCode}
            </AnimatedText>
          </View>
          <AnimatedText style={[styles.text, styles.right]} weight={600}>
            {this.renderScore(item)}
          </AnimatedText>
        </View>
        {item.nugget.text !== '' ? (
          <AnimatedText style={styles.nugget}>{item.nugget.text}</AnimatedText>
        ) : null}
      </View>
    );
  };

  handleGamePress(game) {
    this.showAd();
    if (game.statusNum === 1) {
      this.props.navigation.navigate('PreGame', game);
    } else {
      this.props.navigation.navigate('GameDetails', game);
    }
  }

  showAd() {
    const advert = firebase
      .admob()
      .interstitial('ca-app-pub-1108597602432224/5782605644');
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    request.addKeyword('foo').addKeyword('bar');
    advert.loadAd(request.build());
    advert.on('onAdLoaded', () => {
      if (advert.isLoaded()) {
        advert.show();
      }
    });
  }

  render() {
    const {loading, games} = this.state;
    if (loading) {
      return <Loading backgroundColor={darkBackground} />;
    }
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={games}
          keyExtractor={item => item.gameId}
          renderItem={this.renderGame}
        />
      </ScrollView>
    );
  }
}
