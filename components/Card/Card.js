import React, {PureComponent} from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {styles} from './Card.styles';
import AnimatedText from '../AnimatedText/AnimatedText';
import reactotron from 'reactotron-react-native';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default class Card extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(nextProps, prevState) {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        150,
        'easeInEaseOut',
        LayoutAnimation.Properties.opacity,
      ),
    );
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
          onLayout={e => {
            if (this.props.printLayout) {
              reactotron.log(e);
            }
          }}
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
      <View
        style={[styles.container, props.style]}
        onLayout={e => {
          if (props.printLayout) {
            reactotron.log(e);
          }
        }}>
        {this.renderTitle()}
        {props.children}
      </View>
    );
  }
}
