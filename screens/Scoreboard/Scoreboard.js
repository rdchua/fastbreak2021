import React, {Component} from 'react';
import {View, StatusBar, ActivityIndicator} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {tabBarTextStyle, tabBarUnderlineStyle} from './../../Theme';
import Header from '../../components/Header/Header';
import GamesPage from '../Games/Games';
import moment from 'moment-timezone';
import * as theme from '../../Theme';
import {styles} from './Scorebord.styles';
import Modal from 'react-native-modal';

export default class DailyTabs extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={theme.darkBackground} />
        <Header navigation={navigation} title="Games" />
        <ScrollableTabView
          useViewPager={true}
          initialPage={6}
          tabBarPosition="top"
          tabBarActiveTextColor="white"
          tabBarUnderlineStyle={tabBarUnderlineStyle}
          tabBarInactiveTextColor="rgba(255,255,255,0.2)"
          prerenderingSiblingsNumber={2}
          tabBarTextStyle={tabBarTextStyle}
          renderTabBar={() => (
            <ScrollableTabBar backgroundColor={theme.darkBackground} />
          )}>
          <GamesPage
            navigation={navigation}
            date={moment
              .tz(moment().startOf('day'), 'America/New_York')
              .subtract(6, 'days')}
            tabLabel={`${moment
              .tz(moment().startOf('day'), 'America/New_York')
              .subtract(6, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
          <GamesPage
            navigation={navigation}
            date={moment
              .tz(moment().startOf('day'), 'America/New_York')
              .subtract(5, 'days')}
            tabLabel={`${moment
              .tz(moment().startOf('day'), 'America/New_York')
              .subtract(5, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
          <GamesPage
            navigation={navigation}
            date={moment
              .tz(moment().startOf('day'), 'America/New_York')
              .subtract(4, 'days')}
            tabLabel={`${moment
              .tz(moment().startOf('day'), 'America/New_York')
              .subtract(4, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
          <GamesPage
            navigation={navigation}
            date={moment
              .tz(moment().startOf('day'), 'America/New_York')
              .subtract(3, 'days')}
            tabLabel={`${moment
              .tz(moment().startOf('day'), 'America/New_York')
              .subtract(3, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
          <GamesPage
            navigation={navigation}
            date={moment
              .tz(moment().startOf('day'), 'America/New_York')
              .subtract(2, 'days')}
            tabLabel={`${moment
              .tz(moment().startOf('day'), 'America/New_York')
              .subtract(2, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
          <GamesPage
            navigation={navigation}
            date={moment
              .tz(moment().startOf('day'), 'America/New_York')
              .subtract(1, 'days')}
            tabLabel={`YESTERDAY`}
          />
          <GamesPage
            navigation={navigation}
            date={moment.tz(moment().startOf('day'), 'America/New_York')}
            tabLabel={`TODAY`}
          />
          <GamesPage
            navigation={navigation}
            date={moment
              .tz(moment().startOf('day'), 'America/New_York')
              .add(1, 'days')}
            tabLabel={`TOMORROW`}
          />
          <GamesPage
            navigation={navigation}
            date={moment
              .tz(moment().startOf('day'), 'America/New_York')
              .add(2, 'days')}
            tabLabel={`${moment
              .tz(moment().startOf('day'), 'America/New_York')
              .add(2, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
          <GamesPage
            navigation={navigation}
            date={moment
              .tz(moment().startOf('day'), 'America/New_York')
              .add(3, 'days')}
            tabLabel={`${moment
              .tz(moment().startOf('day'), 'America/New_York')
              .add(3, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
          <GamesPage
            navigation={navigation}
            date={moment
              .tz(moment().startOf('day'), 'America/New_York')
              .add(4, 'days')}
            tabLabel={`${moment
              .tz(moment().startOf('day'), 'America/New_York')
              .add(4, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
          <GamesPage
            navigation={navigation}
            date={moment
              .tz(moment().startOf('day'), 'America/New_York')
              .add(5, 'days')}
            tabLabel={`${moment
              .tz(moment().startOf('day'), 'America/New_York')
              .add(5, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
          <GamesPage
            navigation={navigation}
            date={moment
              .tz(moment().startOf('day'), 'America/New_York')
              .add(6, 'days')}
            tabLabel={`${moment
              .tz(moment().startOf('day'), 'America/New_York')
              .add(6, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
        </ScrollableTabView>
      </View>
    );
  }
}
