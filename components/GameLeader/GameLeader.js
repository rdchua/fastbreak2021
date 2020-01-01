import React, {PureComponent} from 'react';
import {View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {styles} from './GameLeader.styles';
import reactotron from 'reactotron-react-native';
import {headshot} from '../../api/data.nba';
import {getTeamDetails, getTeamImage} from '../../utils/helper';
import AnimatedText from '../AnimatedText/AnimatedText';
import DeviceInfo from 'react-native-device-info';
const fontScale = DeviceInfo.getFontScaleSync();
const MIN_WIDTH = {width: 45 * fontScale};
const NORMAL_WIDTH = {width: 43 * fontScale};
const PERCENT_WIDTH = {width: 60 * fontScale};
const FRACTION_WIDTH = {marginRight: 10};

export default class GameLeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {player} = this.props;
    const playerTeam = getTeamDetails(player.teamId);
    const teamImage = getTeamImage(playerTeam.triCode);
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.props.handlePress}
          style={styles.details}>
          <View style={styles.teamContainer}>
            <Image source={teamImage} style={styles.teamImage} />
            <AnimatedText weight={500} style={styles.jersey}>
              {player.pos ? player.pos : `#${player.jersey}`}
            </AnimatedText>
          </View>
          <Image
            style={[
              styles.headshot,
              {backgroundColor: playerTeam.primaryColor},
            ]}
            source={{uri: headshot(player.personId)}}
          />
        </TouchableOpacity>
        <View style={styles.stats}>
          <AnimatedText weight={500} style={styles.playerName}>
            {player.firstName} {player.lastName}
            <AnimatedText style={styles.teamcode}>
              {' '}
              - {playerTeam.triCode}
            </AnimatedText>
          </AnimatedText>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View>
              <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                PTS
              </AnimatedText>
              <AnimatedText style={[styles.statVal, NORMAL_WIDTH]} weight={500}>
                {player.points}
              </AnimatedText>
            </View>
            <View>
              <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                REB
              </AnimatedText>
              <AnimatedText weight={500} style={[styles.statVal, NORMAL_WIDTH]}>
                {player.totReb}
              </AnimatedText>
            </View>
            <View>
              <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                AST
              </AnimatedText>
              <AnimatedText weight={500} style={[styles.statVal, NORMAL_WIDTH]}>
                {player.assists}
              </AnimatedText>
            </View>
            <View>
              <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                STL
              </AnimatedText>
              <AnimatedText weight={500} style={[styles.statVal, NORMAL_WIDTH]}>
                {player.steals}
              </AnimatedText>
            </View>
            <View>
              <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                BLK
              </AnimatedText>
              <AnimatedText weight={500} style={[styles.statVal, NORMAL_WIDTH]}>
                {player.blocks}
              </AnimatedText>
            </View>
            <View>
              <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                FG
              </AnimatedText>
              <AnimatedText
                weight={500}
                style={[styles.statVal, FRACTION_WIDTH]}>
                {player.fgm}/{player.fga}
              </AnimatedText>
            </View>
            <View>
              <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                FG%
              </AnimatedText>
              <AnimatedText
                weight={500}
                style={[styles.statVal, PERCENT_WIDTH]}>
                {player.fgp}%
              </AnimatedText>
            </View>
            <View>
              <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                3P
              </AnimatedText>
              <AnimatedText
                weight={500}
                style={[styles.statVal, FRACTION_WIDTH]}>
                {player.tpm}/{player.tpa}
              </AnimatedText>
            </View>
            <View>
              <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                3P%
              </AnimatedText>
              <AnimatedText
                weight={500}
                style={[styles.statVal, PERCENT_WIDTH]}>
                {player.tpp}%
              </AnimatedText>
            </View>
            <View>
              <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                FT
              </AnimatedText>
              <AnimatedText
                weight={500}
                style={[styles.statVal, FRACTION_WIDTH]}>
                {player.ftm}/{player.fta}
              </AnimatedText>
            </View>
            <View>
              <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                FT%
              </AnimatedText>
              <AnimatedText
                weight={500}
                style={[styles.statVal, PERCENT_WIDTH]}>
                {player.ftp}%
              </AnimatedText>
            </View>
            <View>
              <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                OREB
              </AnimatedText>
              <AnimatedText
                weight={500}
                style={[styles.statVal, PERCENT_WIDTH]}>
                {player.offReb}
              </AnimatedText>
            </View>
            <View>
              <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                DREB
              </AnimatedText>
              <AnimatedText
                weight={500}
                style={[styles.statVal, PERCENT_WIDTH]}>
                {player.defReb}
              </AnimatedText>
            </View>
            <View>
              <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                TO
              </AnimatedText>
              <AnimatedText
                weight={500}
                style={[styles.statVal, PERCENT_WIDTH]}>
                {player.turnovers}
              </AnimatedText>
            </View>
            <View>
              <AnimatedText style={[styles.statName, MIN_WIDTH]}>
                +/-
              </AnimatedText>
              <AnimatedText weight={500} style={[styles.statVal, NORMAL_WIDTH]}>
                {player.plusMinus}
              </AnimatedText>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
