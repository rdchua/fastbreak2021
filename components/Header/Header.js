import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {styles} from './HeaderStyles';
import Store from 'react-native-simple-store';
import AnimatedText from '../AnimatedText/AnimatedText';
import {getTeams} from '../../api/fantasy';
import reactotron from 'reactotron-react-native';
import {mapUserTeams} from '../../utils/fantasy/userHelper';
import {refreshToken} from '../../utils/fantasy/tokenHelper';
import Modal from 'react-native-modal';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      image_url: null,
      teams: [],
    };
  }

  componentDidMount() {
    Store.get('user_picture').then(image_url => {
      if (image_url) {
        this.setState({image_url: image_url});
      }
    });
  }

  fetchTeams(token) {
    getTeams(token.access_token).then(data => {
      if (data.error) {
        reactotron.log('Token has expired, refreshing token');
        this.refreshToken(token.refresh_token);
      }
      const teams = mapUserTeams(data.fantasy_content.users[0].user[1].games);
      this.setState({loading: false, teams: teams[0].teams});
    });
  }

  openProfile() {
    Store.get('yahoo_token').then(token => {
      if (token) {
        this.fetchTeams(token);
        this.setState({modalVisible: true});
      } else {
        this.props.navigation.navigate('Login');
      }
    });
  }

  renderUserPicture = () => {
    const {image_url} = this.state;
    if (image_url) {
      return <Image source={{uri: image_url}} style={styles.logoFantasy} />;
    }
    return (
      <View style={styles.userIcon}>
        <Icon2 name="md-person" size={18} color="#aaa" />
      </View>
    );
  };

  refreshToken(refresh_token) {
    refreshToken(refresh_token).then(token => {
      reactotron.log('new token: ', token);
      this.fetchTeams(token);
    });
  }

  handleTeamPress(team) {
    Store.update('user_picture', team.team_logos[0].url);
    Store.update('team_key', team.team_key);
    this.setState({modalVisible: false});
    this.props.navigation.navigate('FantasyTabs', team);
  }

  renderTeam = team => {
    return (
      <TouchableOpacity
        style={styles.teamContainer}
        onPress={() => this.handleTeamPress(team)}>
        <Image
          source={{uri: team.team_logos[0].url}}
          style={styles.teamImage}
        />
        <View style={styles.teamInfoContainer}>
          <AnimatedText weight={500} style={styles.teamName}>
            {team.name}
          </AnimatedText>
          <View style={{flexDirection: 'row'}}>
            <AnimatedText style={styles.teamInfo}>
              Moves: {team.number_of_moves}
            </AnimatedText>
            <AnimatedText style={styles.teamInfo}>
              Trades: {team.number_of_trades}
            </AnimatedText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {loading, modalVisible} = this.state;
    return (
      <View style={[styles.container, styles.row]}>
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={() => this.openProfile()}>
          {this.renderUserPicture()}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.input}
          onPress={() => this.props.navigation.navigate('Search')}>
          <AnimatedText weight={500} style={styles.text}>
            Search
          </AnimatedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => this.props.navigation.navigate('Calendar')}>
          <Icon name="calendar" color="#666" size={24} style={styles.icon} />
        </TouchableOpacity>
        <Modal
          useNativeDriver
          isVisible={modalVisible}
          style={styles.modal}
          swipeDirection={['down']}
          onBackdropPress={() => this.setState({modalVisible: false})}>
          <View style={styles.modalContent}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <FlatList
                style={styles.teamList}
                ListHeaderComponent={
                  <AnimatedText weight={700} style={styles.header}>
                    My Fantasy Teams
                  </AnimatedText>
                }
                data={this.state.teams}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => this.renderTeam(item)}
              />
            )}
          </View>
        </Modal>
      </View>
    );
  }
}
