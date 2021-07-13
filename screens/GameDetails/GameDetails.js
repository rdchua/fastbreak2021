/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Animated, StatusBar, Image} from 'react-native';
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
import {getTeamImage} from '../../utils/helper';
import Twitter from './Twitter/Twitter';
const headerHeight = 80;

export default class GameDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameDetails: this.props.navigation.state.params,
    };
    this.scrollY = new Animated.Value(0);
    this.animatedValue = new Animated.Value(0);
    this.scrollPos = 0;
  }

  componentDidMount() {
    this.props.navigation.setParams({
      animatedValue: this.scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [25, 0],
        extrapolate: 'clamp',
      }),
      animatedOpacityIn: this.scrollY.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      animatedOpacityOut: this.scrollY.interpolate({
        inputRange: [0, headerHeight - 20],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      }),
    });
  }

  handleScroll = e => {
    // reactotron.log(e.nativeEvent.contentOffset.y);
    this.scrollPos = e.nativeEvent.contentOffset.y;
    this.scrollY.setValue(e.nativeEvent.contentOffset.y);
    // Animated.event([
    //   {
    //     nativeEvent: {
    //       contentOffset: {
    //         y: this.scrollY,
    //       },
    //     },
    //   },
    // ]);
  };

  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    const translateY = params.animatedValue;
    const transform = [{translateY}];
    const homeTeamImage = getTeamImage(params.hTeam.triCode);
    const awayTeamImage = getTeamImage(params.vTeam.triCode);
    return {
      headerTitle: (
        <Animated.View
          style={{
            flex: 1,
            height: '100%',
          }}>
          <Animated.View
            style={[
              transform,
              {
                opacity: params.animatedOpacityIn
                  ? params.animatedOpacityIn
                  : 0,
                position: 'absolute',
                zIndex: 2,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <View style={styles.row}>
              <Image source={awayTeamImage} style={styles.teamImage} />
              <AnimatedText style={styles.clock} weight={700}>
                {params.vTeam.triCode}
                {'  '}
                {params.vTeam.score} - {params.hTeam.score}
                {params.playoffs && params.playoffs.seriesTextSummary}
                {'  '}
                {params.hTeam.triCode}
              </AnimatedText>
              <Image source={homeTeamImage} style={styles.teamImage} />
            </View>
          </Animated.View>
          <Animated.View
            style={[
              {
                opacity: params.animatedOpacityOut
                  ? params.animatedOpacityOut
                  : 1,
                position: 'absolute',
                zIndex: 1,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <AnimatedText weight={700} style={styles.clock}>
              {params.vTeam.triCode} @ {params.hTeam.triCode}
            </AnimatedText>
          </Animated.View>
        </Animated.View>
      ),
      headerStyle: {
        elevation: 0,
        backgroundColor: cardBackground,
      },
      headerTintColor: '#fff',
    };
  };

  handleChangeTab = ({i, ref}) => {
    if (i === 0 && this.scrollPos < headerHeight / 2) {
      this.hideScore();
    } else {
      this.showScore();
    }
  };

  showScore() {
    Animated.timing(this.scrollY, {
      toValue: 80,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }

  hideScore() {
    Animated.timing(this.scrollY, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }

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
          prerenderingSiblingsNumber={2}
          onChangeTab={this.handleChangeTab}
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
            scrollY={this.scrollY}
            headerHeight={headerHeight}
            handleScroll={this.handleScroll}
          />
          <Boxscore
            navigation={this.props.navigation}
            gameDetails={this.state.gameDetails}
            tabLabel="BOXSCORE"
          />
          <Plays gameDetails={this.state.gameDetails} tabLabel="PLAYS" />
          <Twitter gameDetails={this.state.gameDetails} tabLabel="FEED" />
          <Feed gameDetails={this.state.gameDetails} tabLabel="HIGHLIGHTS" />
        </ScrollableTabView>
      </View>
    );
  }
}
