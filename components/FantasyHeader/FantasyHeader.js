import React, {PureComponent} from 'react';
import {View, TouchableOpacity} from 'react-native';
import AnimatedText from '../AnimatedText/AnimatedText';
import {styles} from './FantasyHeader.styles';
import Icon from 'react-native-vector-icons/AntDesign';
export default class FantasyHeader extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => this.props.navigation.goBack()}>
          <Icon style={styles.icon} name="arrowleft" color="white" size={20} />
        </TouchableOpacity>
      </View>
    );
  }
}
