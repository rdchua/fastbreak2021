import React, {Component} from 'react';
import {
  ScrollView,
  FlatList,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {
  tabBarTextStyle,
  tabBarUnderlineStyle,
  darkBackground,
  cardBackground,
} from '../../Theme';
import {styles} from './Standings.styles';
import Header from '../../components/Header/Header';
import Conference from './Conference/Conference';
import Division from './Division/Division';
import Overall from './Overall/Overall';
export default class Standings extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <StatusBar backgroundColor={darkBackground} />
        <ScrollableTabView
          useViewPager={true}
          initialPage={0}
          tabBarPosition="top"
          tabBarActiveTextColor="white"
          tabBarUnderlineStyle={tabBarUnderlineStyle}
          tabBarInactiveTextColor="rgba(255,255,255,0.2)"
          prerenderingSiblingsNumber={Infinity}
          tabBarTextStyle={tabBarTextStyle}
          renderTabBar={() => (
            <ScrollableTabBar backgroundColor={darkBackground} />
          )}>
          <Conference navigation={navigation} tabLabel="CONFERENCE" />
          <Division navigation={navigation} tabLabel="DIVISION" />
          <Overall navigation={navigation} tabLabel="OVERALL" />
        </ScrollableTabView>
      </View>
    );
  }
}
