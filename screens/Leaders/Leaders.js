import React, {Component} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import {styles} from './Leaders.styles';
import {getStatLeader} from '../../api/stats.nba';
import reactotron from 'reactotron-react-native';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import {darkBackground} from '../../Theme';
import {getTeamDetailsByCode} from '../../utils/helper';
import StatLeader from '../../components/StatLeader/StatLeader';
import Card from '../../components/Card/Card';

export default class Leaders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchLeaders();
  }

  fetchLeaders() {
    Promise.all([
      getStatLeader('PTS', 'PerGame'),
      getStatLeader('AST', 'PerGame'),
      getStatLeader('REB', 'PerGame'),
      getStatLeader('STL', 'PerGame'),
      getStatLeader('BLK', 'PerGame'),
      getStatLeader('FG_PCT', 'Totals'),
      getStatLeader('FG3M', 'Totals'),
      getStatLeader('FG3_PCT', 'Totals'),
    ]).then(response => {
      reactotron.log(response);
      this.setState({
        loading: false,
        pointLeaders: response[0].data.resultSet.rowSet,
        assistLeaders: response[1].data.resultSet.rowSet,
        reboundLeaders: response[2].data.resultSet.rowSet,
        stealLeaders: response[3].data.resultSet.rowSet,
        blockLeaders: response[4].data.resultSet.rowSet,
        fieldGoalPctLeaders: response[5].data.resultSet.rowSet,
        threesMadeLeaders: response[6].data.resultSet.rowSet,
        threePctLeaders: response[7].data.resultSet.rowSet,
      });
    });
  }

  renderLeader = (item, index, label, pct) => {
    const player = {
      info: {
        firstName: item[2].split(' ')[0],
        lastName: item[2].split(' ')[1],
        personId: item[0],
      },
      value: pct ? (item[index] * 100).toFixed(1) + '%' : item[index],
    };
    const team = getTeamDetailsByCode(item[3]);
    return <StatLeader name={label} team={team} player={player} />;
  };

  render() {
    const {
      loading,
      pointLeaders,
      assistLeaders,
      reboundLeaders,
      stealLeaders,
      blockLeaders,
      fieldGoalPctLeaders,
      threesMadeLeaders,
      threePctLeaders,
    } = this.state;
    if (loading) {
      return <Loading backgroundColor={darkBackground} />;
    }
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Card titleStyle={styles.cardTitle} title="Points">
            <FlatList
              data={pointLeaders.slice(0, 5)}
              keyExtractor={item => item[0]}
              renderItem={({item, index}) => this.renderLeader(item, 22, 'PTS')}
            />
          </Card>
          <Card titleStyle={styles.cardTitle} title="Assists">
            <FlatList
              data={assistLeaders.slice(0, 5)}
              keyExtractor={item => item[0]}
              renderItem={({item, index}) => this.renderLeader(item, 18, 'AST')}
            />
          </Card>
          <Card titleStyle={styles.cardTitle} title="Rebounds">
            <FlatList
              data={reboundLeaders.slice(0, 5)}
              keyExtractor={item => item[0]}
              renderItem={({item, index}) => this.renderLeader(item, 17, 'REB')}
            />
          </Card>
          <Card titleStyle={styles.cardTitle} title="Steals">
            <FlatList
              data={stealLeaders.slice(0, 5)}
              keyExtractor={item => item[0]}
              renderItem={({item, index}) => this.renderLeader(item, 19, 'STL')}
            />
          </Card>
          <Card titleStyle={styles.cardTitle} title="Blocks">
            <FlatList
              data={blockLeaders.slice(0, 5)}
              keyExtractor={item => item[0]}
              renderItem={({item, index}) => this.renderLeader(item, 20, 'BLK')}
            />
          </Card>
          <Card titleStyle={styles.cardTitle} title="Field Goal %">
            <FlatList
              data={fieldGoalPctLeaders.slice(0, 5)}
              keyExtractor={item => item[0]}
              renderItem={({item, index}) =>
                this.renderLeader(item, 8, 'FG%', true)
              }
            />
          </Card>
          <Card titleStyle={styles.cardTitle} title="Threes Made">
            <FlatList
              data={threesMadeLeaders.slice(0, 5)}
              keyExtractor={item => item[0]}
              renderItem={({item, index}) => this.renderLeader(item, 9, "3'S")}
            />
          </Card>
          <Card titleStyle={styles.cardTitle} title="Three Point %">
            <FlatList
              data={threePctLeaders.slice(0, 5)}
              keyExtractor={item => item[0]}
              renderItem={({item, index}) =>
                this.renderLeader(item, 11, '3P%', true)
              }
            />
          </Card>
        </ScrollView>
      </View>
    );
  }
}
