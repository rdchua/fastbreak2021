import React, {PureComponent} from 'react';
import {View, TouchableOpacity, Linking, Image} from 'react-native';
import {styles} from './NewsFeed.styles';
import AnimatedText from '../AnimatedText/AnimatedText';
import moment from 'moment';

export default class NewsFeed extends PureComponent {
  render() {
    const {article, style} = this.props;
    const a = article.author ? article.author.split('|')[0] : '';
    const d = article.author ? article.author.split('|')[1] : '';
    return (
      <TouchableOpacity
        style={[styles.content, style]}
        onPress={() =>
          Linking.openURL(`https://sports.abs-cbn.com${article.link}`)
        }>
        <View style={styles.contentContainer}>
          <View style={styles.headline}>
            <AnimatedText
              weight={500}
              numberOfLines={2}
              style={styles.headlineValue}>
              {article.title}
            </AnimatedText>
          </View>
          {article.image ? (
            <View style={styles.newsImage}>
              <Image source={{uri: article.image}} style={styles.image} />
            </View>
          ) : null}
        </View>
        <AnimatedText
          style={[styles.author, {marginTop: article.image ? -10 : 10}]}>
          {a === '' ? 'NBA' : a.replace('By:', '')}
          {article.author ? (
            <AnimatedText style={{color: 'gray'}}>
              •{' '}
              {moment(article.date, 'YYYY-MM-DD hh:mm:ss')
                .fromNow()
                .replace('ago', '')}
            </AnimatedText>
          ) : (
            <AnimatedText style={{color: 'gray'}}>
              • {moment(article.date2, 'MMM DD, hh:mma').fromNow()}
            </AnimatedText>
          )}
        </AnimatedText>
      </TouchableOpacity>
    );
  }
}
