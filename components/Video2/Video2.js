import React, {PureComponent} from 'react';
import {View, TouchableOpacity, Linking, Alert, Image} from 'react-native';
import {styles} from './Video2.styles';
import AnimatedText from '../AnimatedText/AnimatedText';
import moment from 'moment';
import firebase from 'react-native-firebase';

export default class Video2 extends PureComponent {
  openYoutube(youtubeVideoId) {
    Linking.canOpenURL(`https://www.youtube.com/watch?v=${youtubeVideoId}`)
      .then(supported => {
        console.log(supported);
        if (!supported) {
          Alert.alert('We found no apps that can open this video');
        } else {
          this.showAd();
          return Linking.openURL(
            `https://www.youtube.com/watch?v=${youtubeVideoId}`,
          );
        }
      })
      .catch(err => console.error('An error occurred', err));
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
    const video = this.props.video.snippet;
    const videoId = video.resourceId.videoId;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.openYoutube(videoId)}>
        <Image
          source={{
            uri: video.thumbnails.standard
              ? video.thumbnails.standard.url
              : `https://img.youtube.com/vi/${videoId}/0.jpg`,
          }}
          resizeMode="cover"
          style={styles.thumbnail}
        />
        <View style={{flex: 1}}>
          <AnimatedText weight={500} numberOfLines={3} style={styles.title}>
            {video.title}
          </AnimatedText>
          <AnimatedText style={styles.time}>{video.channelTitle}</AnimatedText>
          <AnimatedText style={styles.time}>
            {moment(video.publishedAt).fromNow()}
          </AnimatedText>
        </View>
      </TouchableOpacity>
    );
  }
}
