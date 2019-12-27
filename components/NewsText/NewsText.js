import React, {PureComponent} from 'react';
import {View} from 'react-native';
import AnimatedText from '../AnimatedText/AnimatedText';
import {styles} from './NewsText.styles';
export default class NewsText extends PureComponent {
  render() {
    const {title, body} = this.props;
    return (
      <View style={title ? null : styles.empty}>
        {title ? (
          <AnimatedText weight={700} style={styles.articleTitle}>
            {title}
          </AnimatedText>
        ) : null}
        <AnimatedText style={styles.articleBody}>{body}</AnimatedText>
      </View>
    );
  }
}
