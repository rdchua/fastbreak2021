import React, {Component} from 'react';
import {View, FlatList, TouchableOpacity, Image} from 'react-native';
import {styles} from './FantasyPlayerStyles';
import {getStatCategory} from '../../utils/helper';
import {headshot} from '../../api/data.nba';
import DeviceInfo from 'react-native-device-info';
import AnimatedText from '../AnimatedText/AnimatedText';
import reactotron from 'reactotron-react-native';
const fontScale = DeviceInfo.getFontScaleSync();
const MIN_WIDTH = {width: 50 * fontScale};
const NORMAL_WIDTH = {width: 43 * fontScale};

export default class FantasyPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderStat = stat => {
    return (
      <View>
        <AnimatedText style={[styles.statName, MIN_WIDTH]}>
          {getStatCategory(stat.stat_id)}
        </AnimatedText>
        <AnimatedText weight={500} style={[styles.statValue, MIN_WIDTH]}>
          {stat.value}
        </AnimatedText>
      </View>
    );
  };

  render() {
    const {player, playerInfo, teamInfo, teamImage, stats} = this.props;
    return (
      <View style={styles.playerContainer}>
        <TouchableOpacity
          style={styles.details}
          onPress={this.props.handleImagePress}>
          <View style={styles.teamContainer}>
            <Image source={teamImage} style={styles.teamImage} />
            <AnimatedText
              weight={500}
              style={styles.jersey}>{`#${player.uniform_number}`}</AnimatedText>
          </View>
          <Image
            source={{uri: headshot(playerInfo.personId)}}
            style={[
              styles.playerImage,
              {backgroundColor: teamInfo.primaryColor},
            ]}
          />
        </TouchableOpacity>
        <View style={styles.playerInfo}>
          <View>
            <AnimatedText weight={500} style={styles.playerName}>
              {player.name.full}
              <AnimatedText style={styles.teamcode}>
                {' '}
                ({player.display_position})
                <AnimatedText weight={600} style={styles.status}>
                  {' '}
                  {player.status ? player.status : null}
                </AnimatedText>
              </AnimatedText>
            </AnimatedText>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={stats}
            keyExtractor={item =>
              item.stat ? item.stat.stat_id : item.stat_id
            }
            renderItem={({item, index}) =>
              this.renderStat(item.stat ? item.stat : item)
            }
          />
        </View>
      </View>
    );
  }
}
