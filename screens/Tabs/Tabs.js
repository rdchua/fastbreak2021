import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Games from './../Scoreboard/Scoreboard';
import Icon from 'react-native-vector-icons/dist/Feather';
import * as theme from './../../Theme';
import News from '../News.js/News';
import Standings from '../Standings/Standings';
import Leaders from '../Leaders/Leaders';
import MyTeam from '../MyTeam/MyTeam';

export default createBottomTabNavigator(
  {
    Games: {
      screen: Games,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="layout" color={tintColor} size={22} />
        ),
      },
    },
    News: {
      screen: News,
      navigationOptions: {
        header: null,
        tabBarIcon: ({tintColor}) => (
          <Icon name="book-open" color={tintColor} size={22} />
        ),
      },
    },
    Standings: {
      screen: Standings,
      navigationOptions: {
        header: null,
        tabBarIcon: ({tintColor}) => (
          <Icon name="list" color={tintColor} size={22} />
        ),
      },
    },
    Leaders: {
      screen: Leaders,
      navigationOptions: {
        header: null,
        tabBarIcon: ({tintColor}) => (
          <Icon name="star" color={tintColor} size={22} />
        ),
      },
    },
    MyTeam: {
      screen: MyTeam,
      navigationOptions: {
        header: null,
        tabBarIcon: ({tintColor}) => (
          <Icon name="users" color={tintColor} size={22} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Games',
    labeled: true,
    activeTintColor: 'blue',
    activeColor: '#1988F4',
    inactiveColor: 'gray',
    tabBarOptions: {
      style: {backgroundColor: '#111', borderTopWidth: 0},
    },
  },
);
