import React, {Component} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {styles} from './Search.styles';
import {getPlayers, headshot} from '../../api/data.nba';
import reactotron from 'reactotron-react-native';
import {
  getPlayerDetails,
  getTeamDetails,
  getTeamImage,
} from '../../utils/helper';
import AnimatedText from '../../components/AnimatedText/AnimatedText';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {darkBackground} from '../../Theme';
import Loading from '../../components/Loading/Loading';
import teams from '../../data/teams.json';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      filtered: [],
    };
  }

  componentDidMount() {
    this.fetchPlayers();
  }

  fetchPlayers() {
    getPlayers().then(response => {
      reactotron.log(response.data);
      this.setState({
        players: response.data.league.standard.concat(teams),
        loading: false,
      });
    });
  }

  renderPlayer = player => {
    const team = getTeamDetails(player.teamId);
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Player', player)}
        style={styles.playerContainer}>
        <Image
          source={{uri: headshot(player.personId)}}
          style={styles.playerImage}
        />
        <View style={styles.playerInfo}>
          <AnimatedText weight={500} style={styles.playerName}>
            {player.firstName} {player.lastName}
          </AnimatedText>
          <AnimatedText style={styles.playerTeam}>{team.fullName}</AnimatedText>
        </View>
      </TouchableOpacity>
    );
  };

  renderTeam = team => {
    const teamImage = getTeamImage(team.triCode);
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Team', team)}
        style={styles.teamContainer}>
        <Image source={teamImage} style={styles.teamImage} />
        <View style={styles.playerInfo}>
          <AnimatedText weight={500} style={styles.teamName}>
            {team.fullName}
          </AnimatedText>
          <AnimatedText style={styles.teamConf}>
            {team.confName}, {team.divName}
          </AnimatedText>
        </View>
      </TouchableOpacity>
    );
  };

  filter = text => {
    reactotron.log(text);
    const filtered = this.state.players.filter(item => {
      if (item.personId) {
        const name = `${item.firstName} ${item.lastName}`;
        return name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
      } else {
        return item.fullName.toLowerCase().indexOf(text.toLowerCase()) !== -1;
      }
    });
    this.setState({filtered: filtered});
  };

  render() {
    if (this.state.loading) {
      return <Loading backgroundColor={darkBackground} />;
    }
    const {filtered} = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-left" size={18} color="white" />
          </TouchableOpacity>
          <TextInput
            onChangeText={this.filter}
            autoFocus={true}
            selectionColor="white"
            placeholder="Search"
            placeholderTextColor="#666"
            style={styles.input}
          />
        </View>
        <FlatList
          contentContainerStyle={{paddingHorizontal: 20, paddingTop: 10}}
          data={filtered}
          keyExtractor={item => item.personId}
          renderItem={({item, index}) =>
            item.personId ? this.renderPlayer(item) : this.renderTeam(item)
          }
        />
      </ScrollView>
    );
  }
}
