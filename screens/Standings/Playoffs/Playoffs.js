import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {styles} from './Playoffs.styles';
import Game from '../../../components/Game/Game';
import {Bracket} from '../../../components/Bracket/Bracket';
import Loading from '../../../components/Loading/Loading';
import reactotron from 'reactotron-react-native';
import AnimatedText from '../../../components/AnimatedText/AnimatedText';

const Playoffs = ({series}) => {
  reactotron.display({name: 'series', value: series});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleIndexChange = index => {
    setSelectedIndex(index);
  };

  const getConference = () => {
    return selectedIndex === 0 ? 'seriesWest' : 'seriesEast';
  };
  return (
    <>
      <View style={styles.segment}>
        <SegmentedControlTab
          tabStyle={{backgroundColor: 'transparent'}}
          tabTextStyle={{padding: 3}}
          values={['WEST', 'EAST']}
          selectedIndex={selectedIndex}
          onTabPress={handleIndexChange}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        horizontal={true}>
        <ScrollView style={styles.roundContainer}>
          <AnimatedText weight={700} style={styles.roundHeader}>
            Round 1
          </AnimatedText>
          <Bracket series={series[getConference()][0]} />
          <Bracket series={series[getConference()][1]} />
          <Bracket series={series[getConference()][2]} />
          <Bracket series={series[getConference()][3]} />
        </ScrollView>
        <ScrollView style={styles.roundContainer}>
          <AnimatedText weight={700} style={styles.roundHeader}>
            Conference Semi-Finals
          </AnimatedText>
          <Bracket series={series[getConference()][4]} />
          <Bracket series={series[getConference()][5]} />
        </ScrollView>
        <ScrollView style={styles.roundContainer}>
          <AnimatedText weight={700} style={styles.roundHeader}>
            Conference Finals
          </AnimatedText>
          <Bracket series={series[getConference()][6]} />
        </ScrollView>
      </ScrollView>
    </>
  );
};

Playoffs.propTypes = {};

export default Playoffs;
