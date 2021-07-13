import React, {PureComponent} from 'react';
import {View} from 'react-native';
import AnimatedText from '../AnimatedText/AnimatedText';
import {styles} from './NewsText.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {textTertiary} from '../../Theme';
export default class NewsText extends PureComponent {
  render() {
    const {title, body, icon} = this.props;
    return (
      <View style={title ? null : styles.empty}>
        {title ? (
          <View style={styles.row}>
            <AnimatedText weight={600} style={styles.articleTitle}>
              {title}
            </AnimatedText>
            {icon ? (
              <Icon
                name="external-link"
                color={textTertiary}
                size={14}
                style={styles.icon}
              />
            ) : null}
          </View>
        ) : null}
        <AnimatedText style={styles.articleBody}>{body}</AnimatedText>
      </View>
    );
  }
}
