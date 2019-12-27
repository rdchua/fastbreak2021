import React, {PureComponent} from 'react';
import {View, Image} from 'react-native';
import {styles} from './NewsCover.styles';
import AnimatedText from '../AnimatedText/AnimatedText';
import moment from 'moment';
export default class NewsCover extends PureComponent {
  render() {
    const {news, style} = this.props;
    return (
      <View style={style}>
        <Image source={{uri: news.cover}} style={styles.cover} />
        <AnimatedText weight={700} style={styles.title}>
          {news.title}
        </AnimatedText>
        <View style={styles.info}>
          <AnimatedText style={styles.author}>
            {news.authors} •{' '}
            <AnimatedText style={styles.time}>
              {moment(news.date_time, 'MMM DD, hh:mma').fromNow()}
            </AnimatedText>
          </AnimatedText>
        </View>
      </View>
    );
  }
}
