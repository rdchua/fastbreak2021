import React, {Component} from 'react';
import {View, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from './Overall.styles';
import {getOverallStandings} from '../../../api/data.nba';
import reactotron from 'reactotron-react-native';
import Loading from '../../../components/Loading/Loading';
import {darkBackground} from '../../../Theme';
import Standing from '../../../components/Standing/Standing';

export default class Overall extends Component {
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
    getOverallStandings().then(response => {
      reactotron.log(response.data.league.standard);
      this.setState({
        standings: response.data.league.standard.teams,
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
          <Standing navigation={navigation} title="OVERALL" teams={standings} />
        </View>
      </ScrollView>
    );
  }
}
