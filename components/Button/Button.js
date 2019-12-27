/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './ButtonStyles';
import AnimatedText from '../AnimatedText/AnimatedText';

export default class Button extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        style={[styles.button, this.props.style]}
        onPress={this.props.handlePress}>
        <AnimatedText
          style={[
            styles.text,
            this.props.textStyle,
            {
              color: 'white',
              borderRadius: 30,
              backgroundColor: this.props.active ? '#178cff' : '#2B2C2E',
              borderWidth: this.props.active ? 0 : 1,
              borderColor: this.props.active ? null : '#343639',
            },
          ]}
          weight={this.props.active ? 700 : 500}>
          {this.props.text}
        </AnimatedText>
      </TouchableOpacity>
    );
  }
}
