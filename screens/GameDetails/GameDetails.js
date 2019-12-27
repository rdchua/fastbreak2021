import React, {Component} from 'react';
import {View, Animated, StatusBar} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {
  tabBarTextStyle,
  tabBarUnderlineStyle,
  darkBackground,
  cardBackground,
} from './../../Theme';
import {styles} from './GameDetails.styles';
import AnimatedText from '../../components/AnimatedText/AnimatedText';
import GameStats from './GameStats/GameStats';
import reactotron from 'reactotron-react-native';
import Boxscore from './Boxscore/Boxscore';
import Plays from './Plays/Plays';
import Feed from './Feed/Feed';

export default class GameDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameDetails: this.props.navigation.state.params,
    };
  }

  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    reactotron.log(params);
    return {
      headerTitle: (
        <Animated.View>
          <AnimatedText weight={700} style={styles.clock}>
            {params.vTeam.triCode} @ {params.hTeam.triCode}
          </AnimatedText>
        </Animated.View>
      ),
      headerStyle: {
        elevation: 0,
        backgroundColor: cardBackground,
      },
      headerTintColor: '#fff',
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={cardBackground} />
        <ScrollableTabView
          useViewPager={true}
          initialPage={0}
          tabBarPosition="top"
          tabBarActiveTextColor="white"
          tabBarUnderlineStyle={tabBarUnderlineStyle}
          tabBarInactiveTextColor="rgba(255,255,255,0.2)"
          prerenderingSiblingsNumber={1}
          tabBarTextStyle={tabBarTextStyle}
          renderTabBar={() => (
            <ScrollableTabBar
              style={{elevation: 6, marginTop: -15}}
              backgroundColor={cardBackground}
            />
          )}>
          <GameStats
            navigation={this.props.navigation}
            gameDetails={this.state.gameDetails}
            tabLabel="STATS"
          />
          <Boxscore
            navigation={this.props.navigation}
            gameDetails={this.state.gameDetails}
            tabLabel="BOXSCORE"
          />
          <Plays gameDetails={this.state.gameDetails} tabLabel="PLAYS" />
          <Feed gameDetails={this.state.gameDetails} tabLabel="HIGHLIGHTS" />
        </ScrollableTabView>
      </View>
    );
  }
}
