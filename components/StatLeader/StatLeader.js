import React, {Component, PureComponent} from 'react';
import {View, Image} from 'react-native';
import AnimatedText from '../AnimatedText/AnimatedText';
import {styles} from './StatLeader.styles';
import {headshot} from '../../api/data.nba';
export default class StatLeader extends PureComponent {
  render() {
    const {team, name, player} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Image
            source={{uri: headshot(player.info.personId)}}
            style={[
              styles.headshot,
              {backgroundColor: team ? team.primaryColor : '#eee'},
            ]}
          />
          <View>
            <AnimatedText style={styles.playerName}>
              {player.info.firstName} {player.info.lastName}
            </AnimatedText>
            <AnimatedText style={styles.playerInfo}>
              {player.info.jersey
                ? `#${player.info.jersey} - ${player.info.pos}`
                : `${team.fullName}`}
            </AnimatedText>
          </View>
          <View style={styles.stat}>
            <AnimatedText style={styles.statValue}>
              {player.value}{' '}
              {player.subinfo ? (
                <AnimatedText style={styles.subinfo}>
                  {player.subinfo}
                </AnimatedText>
              ) : null}
            </AnimatedText>
            <AnimatedText weight={600} style={styles.statName}>
              {name}
            </AnimatedText>
          </View>
        </View>
      </View>
    );
  }
}
