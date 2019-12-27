import React, {PureComponent} from 'react';
import {View, Image, Linking, TouchableOpacity, Alert} from 'react-native';
import {styles} from './Video.styles';
import Card from '../Card/Card';
import Icon from 'react-native-vector-icons/AntDesign';
import AnimatedText from '../../components/AnimatedText/AnimatedText';

export default class Video extends PureComponent {
  handlePress = videoId => {
    Linking.canOpenURL(`https://www.youtube.com/watch?v=${videoId}`)
      .then(supported => {
        if (!supported) {
          Alert.alert('We found no apps that can open this video');
        } else {
          return Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  render() {
    const {video} = this.props;
    return (
      <Card style={{padding: 0}}>
        <TouchableOpacity
          onPress={() => this.handlePress(video.id.videoId)}
          style={[styles.row, styles.videoContainer]}>
          <View>
            <View style={styles.overlay}></View>
            <View style={styles.iconContainer}>
              <Icon
                name="play"
                color="white"
                size={24}
                style={styles.playIcon}
              />
            </View>
            <Image
              source={{uri: video.snippet.thumbnails.medium.url}}
              style={styles.thumbnail}
            />
          </View>
          <View style={styles.videoInfo}>
            <AnimatedText
              weight={500}
              numberOfLines={3}
              style={styles.videoTitle}>
              {video.snippet.title}
            </AnimatedText>
            <AnimatedText style={styles.videoChannel}>
              {video.snippet.channelTitle}
            </AnimatedText>
          </View>
        </TouchableOpacity>
      </Card>
    );
  }
}
