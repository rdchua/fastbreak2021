import React, {Component} from 'react';
import {Image, TouchableOpacity, View, Linking} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {styles} from './Headline.styles';
import firebase from 'react-native-firebase';
import AnimatedText from '../AnimatedText/AnimatedText';

export default class Headline extends Component {
  constructor(props) {
    super(props);
  }

  openNews(article) {
    this.showAd();
    Linking.openURL(article.source);
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
    const {article} = this.props;
    return (
      <Animatable.View
        style={styles.card}
        animation="fadeInUp"
        duration={300}
        delay={100}>
        <TouchableOpacity
          style={styles.content}
          onPress={() => this.openNews(article)}>
          <Image source={{uri: article.cover}} style={styles.image} />
          <View style={styles.textContainer}>
            <AnimatedText weight={600} style={styles.text} numberOfLines={3}>
              {article.title}
            </AnimatedText>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  }
}
