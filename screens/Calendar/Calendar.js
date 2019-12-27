import React, {Component} from 'react';
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {styles} from './Calendar.styles';
import {Agenda} from 'react-native-calendars';
import AnimatedText from '../../components/AnimatedText/AnimatedText';
import moment from 'moment-timezone';
import teams from '../../data/teams.json';
import {getTeamImage} from '../../utils/helper';
import {getScoreboard, getTeamSchedule} from '../../api/data.nba';
import {
  darkBackground,
  cardBackground,
  accent,
  textTertiary,
  textSecondary,
  textPrimary,
} from '../../Theme';
import reactotron from 'reactotron-react-native';
import Card from '../../components/Card/Card';
import Game from '../../components/Game/Game';
import Empty from '../../components/Empty/Empty';
const screenHeight = Dimensions.get('window').height;

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedTeam: 'all',
    };
  }

  componentDidMount() {
    this.fetchScoreboard(
      moment.tz(moment().startOf('day'), 'America/New_York'),
    );
  }

  fetchScoreboard = date => {
    const dateUSA = moment
      .tz(date, 'YYYYMMDD', 'America/New_York')
      .format('YYYYMMDD');
    reactotron.log(
      moment(date, 'YYYYMMDD')
        .local()
        .format('YYYY-MM-DD'),
    );
    getScoreboard(dateUSA).then(response => {
      const games = response.data.games;
      let items = [];
      games.forEach(game => {
        items.push({
          date: game.startTimeUTC,
          game: game,
        });
      });
      let newItems;
      if (!this.state.games) {
        newItems = {};
      } else {
        newItems = this.state.games;
      }
      const gameDate = moment(items[0].date).format('YYYY-MM-DD');
      if (!(gameDate in newItems)) {
        newItems[gameDate] = games;
      }
      this.setState({
        games: newItems,
        loading: false,
      });
    });
  };

  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params;
    return {
      headerStyle: {
        elevation: 0,
        backgroundColor: darkBackground,
      },
      headerTintColor: '#fff',
    };
  };

  renderTeam = ({item, index}) => {
    if (item.isNBAFranchise) {
      const teamImage = getTeamImage(item.triCode);
      return (
        <TouchableOpacity
          style={[styles.teamContainer, {borderColor: item.primaryColor}]}>
          <Image source={teamImage} style={styles.teamImage} />
        </TouchableOpacity>
      );
    }
  };

  renderHeader = () => {
    const teamImage = getTeamImage('');
    return (
      <TouchableOpacity style={[styles.teamContainer, {borderColor: '#fff'}]}>
        <Image source={teamImage} style={styles.teamImage} />
      </TouchableOpacity>
    );
  };

  renderEvent = (item, firstItemInDay) => {
    return (
      <Card style={styles.eventContainer}>
        <Game game={item} />
      </Card>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <FlatList
          data={teams}
          horizontal
          ListHeaderComponent={this.renderHeader}
          contentContainerStyle={styles.teamList}
          keyExtractor={item => item.teamId}
          renderItem={this.renderTeam}
        /> */}
        <Agenda
          items={this.state.games}
          onDayPress={day =>
            this.fetchScoreboard(
              moment.tz(
                moment(moment(day.dateString, 'YYYY-MM-DD')).startOf('day'),
                'America/New_York',
              ),
            )
          }
          renderItem={this.renderEvent}
          renderEmptyData={() => {
            return <Empty text="No games scheduled on this date" />;
          }}
          selected={moment().format('YYYY-MM-DD')}
          rowHasChanged={(r1, r2) => {
            return r1.text !== r2.text;
          }}
          theme={{
            backgroundColor: darkBackground,
            calendarBackground: darkBackground,
            textSectionTitleColor: '#fff',
            selectedDayBackgroundColor: accent,
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: textSecondary,
            textDisabledColor: textTertiary,
            dotColor: accent,
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            monthTextColor: textPrimary,
            indicatorColor: 'blue',
            textDayFontFamily: 'SF-Pro-Display-Regular',
            textMonthFontFamily: 'SF-Pro-Display-Bold',
            textDayHeaderFontFamily: 'SF-Pro-Display-Bold',
            textDayFontSize: 16,
            textMonthFontSize: 24,
            textDayHeaderFontSize: 14,
            agendaKnobColor: accent,
          }}
        />
      </View>
    );
  }
}
