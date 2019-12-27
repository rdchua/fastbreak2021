import React, {Component} from 'react';
import {View, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from './Division.styles';
import {getDivisionStandings} from '../../../api/data.nba';
import reactotron from 'reactotron-react-native';
import Loading from '../../../components/Loading/Loading';
import {darkBackground} from '../../../Theme';
import Standing from '../../../components/Standing/Standing';

export default class Division extends Component {
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
    getDivisionStandings().then(response => {
      this.setState({
        southeast: response.data.league.standard.conference.east.southeast,
        atlantic: response.data.league.standard.conference.east.atlantic,
        central: response.data.league.standard.conference.east.central,
        southwest: response.data.league.standard.conference.west.southwest,
        pacific: response.data.league.standard.conference.west.pacific,
        northwest: response.data.league.standard.conference.west.northwest,
        loading: false,
      });
    });
  }

  render() {
    const {
      loading,
      southeast,
      atlantic,
      central,
      southwest,
      pacific,
      northwest,
    } = this.state;
    const {navigation} = this.props;
    if (loading) {
      return <Loading backgroundColor={darkBackground} />;
    }
    return (
      <ScrollView style={styles.container}>
        <View style={{marginTop: 10}}>
          <Standing
            navigation={navigation}
            title="SOUTH EAST"
            teams={southeast}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Standing navigation={navigation} title="ATLANTIC" teams={atlantic} />
        </View>
        <View style={{marginTop: 10}}>
          <Standing navigation={navigation} title="CENTRAL" teams={central} />
        </View>
        <View style={{marginTop: 10}}>
          <Standing
            navigation={navigation}
            title="SOUTH WEST"
            teams={southwest}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Standing navigation={navigation} title="PACIFIC" teams={pacific} />
        </View>
        <View style={{marginTop: 10}}>
          <Standing
            navigation={navigation}
            title="NORTH WEST"
            teams={northwest}
          />
        </View>
      </ScrollView>
    );
  }
}
