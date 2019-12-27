import React, {Component} from 'react';
import * as Animatable from 'react-native-animatable';

const fadeIn = {
  from: {
    opacity: 0,
    translateY: 10,
  },
  to: {
    opacity: 1,
    translateY: 0,
  },
};

export default class AnimatedText extends Component {
  // { fontWeight: '100' }, // Thin
  // { fontWeight: '200' }, // Ultra Light
  // { fontWeight: '300' }, // Light
  // { fontWeight: '400' }, // Regular
  // { fontWeight: '500' }, // Medium
  // { fontWeight: '600' }, // Semibold
  // { fontWeight: '700' }, // Bold
  // { fontWeight: '800' }, // Heavy
  // { fontWeight: '900' }, // Black

  getFontStyles(weight) {
    let font;
    switch (weight) {
      case 500:
        font = this.props.italic
          ? 'SF-Pro-Display-MediumItalic'
          : 'SF-Pro-Display-Medium';
        break;
      case 600:
        font = this.props.italic
          ? 'SF-Pro-Display-SemiboldItalic'
          : 'SF-Pro-Display-Semibold';
        break;
      case 700:
        font = this.props.italic
          ? 'SF-Pro-Display-BoldItalic'
          : 'SF-Pro-Display-Bold';
        break;
      case 300:
        font = this.props.italic
          ? 'SF-Pro-Display-LightItalic'
          : 'SF-Pro-Display-Light';
        break;
      default:
        font = this.props.italic
          ? 'SF-Pro-Display-RegularItalic'
          : 'SF-Pro-Display-Regular';
        break;
    }
    return {
      fontFamily: font,
    };
  }

  render() {
    const props = {...this.props};
    return (
      <Animatable.Text
        useNativeDriver={true}
        animation={fadeIn}
        duration={300}
        delay={50}
        numberOfLines={props.numberOfLines ? props.numberOfLines : null}
        style={[this.getFontStyles(props.weight), props.style]}>
        {props.children}
      </Animatable.Text>
    );
  }
}
