import React, {PureComponent} from 'react';
import {View, TouchableOpacity, Linking, Image} from 'react-native';
import {styles} from './NewsFeed.styles';
import AnimatedText from '../AnimatedText/AnimatedText';
import moment from 'moment';
import firebase from 'react-native-firebase';

export default class NewsFeed extends PureComponent {
  openNews(article) {
    this.showAd();
    Linking.openURL(`https://sports.abs-cbn.com${article.link}`);
  }

  showAd() {
    const advert = firebase
      .admob()
      .interstitial('ca-app-pub-1108597602432224/5355417587');
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    request.addKeyword('foo').addKeyword('bar');
    advert.loadAd(request.build());
    advert.on('onAdLoaded', () => {
      if (advert.isLoaded()) {
        advert.show();
      }
    });
  }

  render() {
    const {article, style} = this.props;
    const a = article.author ? article.author.split('|')[0] : '';
    const d = article.author ? article.author.split('|')[1] : '';
    return (
      <TouchableOpacity
        style={[styles.content, style]}
        onPress={() => this.openNews(article)}>
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
