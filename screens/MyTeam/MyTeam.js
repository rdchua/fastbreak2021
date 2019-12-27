import React, {Component} from 'react';
import {View, ScrollView, FlatList} from 'react-native';
import {styles} from './MyTeam.styles';
import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import Store from 'react-native-simple-store';
import Button from '../../components/Button/Button';
import MyTeamPlayer from '../../components/MyTeamPlayer/MyTeamPlayer';
import AnimatedText from '../../components/AnimatedText/AnimatedText';

export default class MyTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      myTeam: [],
      statType: 'today',
    };
  }

  componentDidMount() {
    this.getMyTeam();
  }

  getMyTeam() {
    Store.get('myTeam').then(team => {
      this.setState({myTeam: team, loading: false});
    });
  }

  renderPlayer = ({item, index}) => {
    return (
      <MyTeamPlayer
        statType={this.state.statType}
        navigation={this.props.navigation}
        player={item}
      />
    );
  };

  resetRoster = () => {
    Store.delete('myTeam');
    this.setState({myTeam: null});
  };

  render() {
    const {myTeam} = this.state;
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <ScrollView style={styles.contentContainer}>
          <Card
            titleBorder
            handleMore={() => this.getMyTeam()}
            titleStyle={styles.cardTitle}
            title="My Team"
            subtitle="Refresh">
            <View style={styles.buttonContainer}>
              <Button
                text="Today"
                active={this.state.statType === 'today'}
                style={styles.button}
                handlePress={() => this.setState({statType: 'today'})}
              />
              <Button
                text="LAST GAME"
                active={this.state.statType === 'latest'}
                style={styles.button}
                handlePress={() => this.setState({statType: 'latest'})}
              />
              <Button
                text="SEASON"
                active={this.state.statType === 'average'}
                style={styles.button}
                handlePress={() => this.setState({statType: 'average'})}
              />
              <Button
                text="Delete all"
                active={this.state.statType === 'Today'}
                style={styles.button}
                handlePress={this.resetRoster}
              />
            </View>
            <FlatList
              data={myTeam}
              initialNumToRender={20}
              extraData={this.state.statType}
              keyExtractor={(item, index) => item.personId}
              renderItem={this.renderPlayer}
              showsVerticalScrollIndicator={false}
            />
            <AnimatedText italic style={styles.info}>
              Press refresh to display added players
            </AnimatedText>
          </Card>
        </ScrollView>
      </View>
    );
  }
}
