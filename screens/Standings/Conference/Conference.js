import React, {Component} from 'react';
import {View, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from './Conference.styles';
import {getConferenceStandings} from '../../../api/data.nba';
import reactotron from 'reactotron-react-native';
import Loading from '../../../components/Loading/Loading';
import {darkBackground} from '../../../Theme';
import Standing from '../../../components/Standing/Standing';

export default class Conference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchStandings();
  }

  fetchStandings() {
    getConferenceStandings().then(response => {
      this.setState({
        standings: response.data.league.standard.conference,
        loading: false,
      });
    });
  }

  render() {
    const {loading, standings} = this.state;
    const {navigation} = this.props;
    if (loading) {
      return <Loading backgroundColor={darkBackground} />;
    }
    return (
      <ScrollView style={styles.container}>
        <View style={{marginTop: 10}}>
          <Standing
            navigation={navigation}
            title="WESTERN"
            teams={standings.west}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Standing
            navigation={navigation}
            title="EASTERN"
            teams={standings.east}
          />
        </View>
      </ScrollView>
    );
  }
}
