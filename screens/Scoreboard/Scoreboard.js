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
import reactotron from 'reactotron-react-native';
const timezone = 'America/New_York';

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
              .tz(moment().startOf('day'), timezone)
              .subtract(6, 'days')}
            tabLabel={`${moment()
              .subtract(6, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
          <GamesPage
            navigation={navigation}
            date={moment
              .tz(moment().startOf('day'), timezone)
              .subtract(5, 'days')}
            tabLabel={`${moment()
              .subtract(5, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
          <GamesPage
            navigation={navigation}
            date={moment
              .tz(moment().startOf('day'), timezone)
              .subtract(4, 'days')}
            tabLabel={`${moment()
              .subtract(4, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
          <GamesPage
            navigation={navigation}
            date={moment
              .tz(moment().startOf('day'), timezone)
              .subtract(3, 'days')}
            tabLabel={`${moment()
              .subtract(3, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
          <GamesPage
            navigation={navigation}
            date={moment
              .tz(moment().startOf('day'), timezone)
              .subtract(2, 'days')}
            tabLabel={`${moment()
              .subtract(2, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
          <GamesPage
            navigation={navigation}
            date={moment
              .tz(moment().startOf('day'), timezone)
              .subtract(1, 'days')}
            tabLabel={`YESTERDAY`}
          />
          <GamesPage
            navigation={navigation}
            date={moment.tz(moment().startOf('day'), timezone)}
            tabLabel={`TODAY`}
          />
          <GamesPage
            navigation={navigation}
            date={moment.tz(moment().startOf('day'), timezone).add(1, 'days')}
            tabLabel={`TOMORROW`}
          />
          <GamesPage
            navigation={navigation}
            date={moment.tz(moment().startOf('day'), timezone).add(2, 'days')}
            tabLabel={`${moment()
              .add(2, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
          <GamesPage
            navigation={navigation}
            date={moment.tz(moment().startOf('day'), timezone).add(3, 'days')}
            tabLabel={`${moment()
              .add(3, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
          <GamesPage
            navigation={navigation}
            date={moment.tz(moment().startOf('day'), timezone).add(4, 'days')}
            tabLabel={`${moment()
              .add(4, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
          <GamesPage
            navigation={navigation}
            date={moment.tz(moment().startOf('day'), timezone).add(5, 'days')}
            tabLabel={`${moment()
              .add(5, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
          <GamesPage
            navigation={navigation}
            date={moment.tz(moment().startOf('day'), timezone).add(6, 'days')}
            tabLabel={`${moment()
              .add(6, 'days')
              .format('MMM DD')
              .toUpperCase()}`}
          />
        </ScrollableTabView>
      </View>
    );
  }
}
