import React, {Component, PureComponent} from 'react';
import {View, Image} from 'react-native';
import {styles} from './Rotowire.styles';
import AnimatedText from '../AnimatedText/AnimatedText';
import {headshot} from '../../api/data.nba';
import moment from 'moment';

export default class Rotowire extends PureComponent {
  render() {
    const {player} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headshotContainer}>
          <Image
            source={{uri: headshot(player.PlayerID)}}
            style={styles.headshot}
          />
        </View>
        <View style={{flex: 1}}>
          <AnimatedText style={styles.headline}>
            {player.ListItemCaption}{' '}
            <AnimatedText style={styles.status}>
              ({player.Injured_Status})
            </AnimatedText>
          </AnimatedText>
          <AnimatedText style={styles.date}>
            Rotowire ·{' '}
            {moment(player.lastUpdate, 'MM/DD/YYYY hh:mm a').fromNow()}
          </AnimatedText>
        </View>
      </View>
    );
  }
}
