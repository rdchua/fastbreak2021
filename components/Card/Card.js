import React, {PureComponent} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from './Card.styles';
import AnimatedText from '../AnimatedText/AnimatedText';
export default class Card extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderSubTitle = subtitle => {
    return subtitle ? (
      <TouchableOpacity onPress={this.props.handleMore}>
        <AnimatedText weight={700} style={styles.subtitle}>
          {this.props.subtitle}
        </AnimatedText>
      </TouchableOpacity>
    ) : null;
  };

  renderTitle = () => {
    const {title, titleStyle, titleBorder, subtitle} = this.props;
    if (title) {
      return (
        <View
          style={[
            titleStyle,
            titleBorder ? styles.border : null,
            styles.titleContainer,
          ]}>
          <AnimatedText weight={700} style={styles.title}>
            {title}
          </AnimatedText>
          {this.renderSubTitle(subtitle)}
        </View>
      );
    }
  };
  render() {
    const props = {...this.props};
    return (
      <View style={[styles.container, props.style]}>
        {this.renderTitle()}
        {props.children}
      </View>
    );
  }
}
