import React from 'react';
import Card from '../Card/Card';
import {View, Image} from 'react-native';
import {styles} from './Bracket.styles';
import {getTeamImage, getTeamDetails} from '../../utils/helper';
import reactotron from 'reactotron-react-native';
import Animated from 'react-native-reanimated';
import {fromTop} from 'react-navigation-transitions';
import AnimatedText from '../AnimatedText/AnimatedText';

export const Bracket = ({series}) => {
  reactotron.log(series);
  const homeTeam = getTeamDetails(series.highSeedId);
  const awayTeam = getTeamDetails(series.lowSeedId);
  const homeTeamImage = getTeamImage(homeTeam.triCode);
  const awayTeamImage = getTeamImage(awayTeam.triCode);
  const homeScore = [
    parseInt(series.highSeedSeriesWins) > parseInt(series.lowSeedSeriesWins)
      ? styles.teamScoreWinner
      : styles.teamScoreLoser,
  ];
  const awayScore = [
    parseInt(series.highSeedSeriesWins) < parseInt(series.lowSeedSeriesWins)
      ? styles.teamScoreWinner
      : styles.teamScoreLoser,
  ];
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content]}>
        <View>
          <View style={styles.contentContainer}>
            <View style={styles.scores}>
              <View style={[styles.teamRow, {zIndex: 2}]}>
                <Image style={styles.teamImage} source={homeTeamImage} />
                <AnimatedText
                  numberOfLines={1}
                  weight={500}
                  style={[styles.teamName, {color: 'white'}]}>
                  {`${series.highSeedTricode ? series.highSeedTricode : '-'}`}
                  <AnimatedText style={{fontSize: 13, color: '#888'}}>
                    {`  `}
                    {`(${series.highSeedRegSeasonWins}-${
                      series.highSeedRegSeasonLosses
                    })`}
                  </AnimatedText>
                </AnimatedText>
                <AnimatedText style={homeScore}>
                  {series.highSeedSeriesWins}
                </AnimatedText>
              </View>
              <View style={[styles.teamRow, {marginTop: -15}]}>
                <Image style={styles.teamImage} source={awayTeamImage} />

                <AnimatedText
                  numberOfLines={1}
                  weight={500}
                  style={[styles.teamName, {color: 'white'}]}>
                  {`${series.lowSeedTricode ? series.lowSeedTricode : '-'}`}
                  <AnimatedText style={{fontSize: 13, color: '#888'}}>
                    {`  `}
                    {`(${series.lowSeedRegSeasonWins}-${
                      series.lowSeedRegSeasonLosses
                    })`}
                  </AnimatedText>
                </AnimatedText>
                <AnimatedText style={awayScore}>
                  {series.lowSeedSeriesWins}
                </AnimatedText>
              </View>
            </View>
          </View>
          <AnimatedText italic={true} style={styles.nugget}>
            {series.seriesText}
          </AnimatedText>
        </View>
      </Animated.View>
    </View>
  );
};
