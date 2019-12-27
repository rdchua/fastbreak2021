import React, {Component} from 'react';
import Weeks from '../Fantasy/Weeks/Weeks';
import {View, StatusBar, FlatList} from 'react-native';
import {styles} from './Fantasy.styles';
import {
  cardBackground,
  tabBarTextStyle,
  tabBarUnderlineStyle,
  darkBackground,
} from '../../Theme';
import FantasyStandings from '../Fantasy/FantasyStandings/FantasyStandings';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import FantasyTeam from './FantasyTeam/FantasyTeam';
import FantasyPlayers from './FantasyPlayers/FantasyPlayers';

export default class Fantasy extends Component {
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params;
    return {
      headerStyle: {
        elevation: 0,
        backgroundColor: cardBackground,
      },
      headerTintColor: '#fff',
    };
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={cardBackground} />
        <ScrollableTabView
          useViewPager={true}
          initialPage={0}
          tabBarPosition="top"
          tabBarActiveTextColor="white"
          tabBarUnderlineStyle={tabBarUnderlineStyle}
          tabBarInactiveTextColor="rgba(255,255,255,0.2)"
          prerenderingSiblingsNumber={2}
          tabBarTextStyle={tabBarTextStyle}
          renderTabBar={() => (
            <ScrollableTabBar
              style={{marginTop: -15}}
              backgroundColor={cardBackground}
            />
          )}>
          <FantasyTeam navigation={navigation} tabLabel="MY TEAM" />
          <Weeks navigation={navigation} tabLabel="MATCHUP" />
          <FantasyPlayers navigation={navigation} tabLabel="PLAYERS" />
          <FantasyStandings navigation={navigation} tabLabel="STANDINGS" />
        </ScrollableTabView>
      </View>
    );
  }
}
