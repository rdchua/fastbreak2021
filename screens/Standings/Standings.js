import React, {useState, useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {
  tabBarTextStyle,
  tabBarUnderlineStyle,
  darkBackground,
} from '../../Theme';
import {styles} from './Standings.styles';
import Header from '../../components/Header/Header';
import Conference from './Conference/Conference';
import Division from './Division/Division';
import Overall from './Overall/Overall';
import Playoffs from './Playoffs/Playoffs';
import {getPlayoffBracket} from '../../api/stats.nba';
import reactotron from 'reactotron-react-native';
import {useGlobal} from 'reactn';
import Loading from '../../components/Loading/Loading';
import * as theme from '../../Theme';

const Standings = ({navigation}) => {
  const [seasonYear, setSeasonYear] = useGlobal('seasonYear');
  const [series, setSeries] = useState({
    seriesWest: null,
    seriesEast: null,
  });
  const [showPlayoffBracket, setshowPlayoffBracket] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPlayoffBracket(seasonYear)
      .then(({data}) => {
        if (
          data.bracket.playoffBracketSeries &&
          data.bracket.playoffBracketSeries.length > 7
        ) {
          const westernBracket = data.bracket.playoffBracketSeries.filter(
            series => {
              return (
                series.seriesConference === 'west' ||
                series.seriesConference === 'West'
              );
            },
          );
          const easternBracket = data.bracket.playoffBracketSeries.filter(
            series => {
              return (
                series.seriesConference === 'east' ||
                series.seriesConference === 'East'
              );
            },
          );
          setSeries({
            seriesWest: westernBracket,
            seriesEast: easternBracket,
          });
          setshowPlayoffBracket(true);
          setLoading(false);
        }
      })
      .catch(err => {
        setshowPlayoffBracket(false);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading backgroundColor={theme.darkBackground} />;
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
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
        {showPlayoffBracket ? (
          <Playoffs
            series={series}
            navigation={navigation}
            tabLabel="PLAYOFFS"
          />
        ) : null}
        <Conference navigation={navigation} tabLabel="CONFERENCE" />
        <Division navigation={navigation} tabLabel="DIVISION" />
        <Overall navigation={navigation} tabLabel="OVERALL" />
      </ScrollableTabView>
    </View>
  );
};
export default Standings;
