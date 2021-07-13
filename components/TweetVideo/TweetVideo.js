import React, {PureComponent} from 'react';
import {View, TouchableOpacity, Dimensions, Image, Share} from 'react-native';
import {styles} from './TweetVideo.styles';
import AnimatedText from '../AnimatedText/AnimatedText';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import {textSecondary} from '../../Theme';
import Video from 'react-native-video-player';
import ParsedText from 'react-native-parsed-text';
const screenWidth = Dimensions.get('window').width;
export default class TweetVideo extends PureComponent {
  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const {tweet} = this.props;
    const video = tweet.extended_entities.media[0].video_info.variants[2].url;
    const thumbnail = tweet.extended_entities.media[0].media_url_https;
    const videoWidth = tweet.extended_entities.media[0].sizes.small.w;
    const videoHeight = tweet.extended_entities.media[0].sizes.small.h;
    const displayHeight = screenWidth * (videoHeight / videoWidth);
    const finalHeight = videoHeight > 500 ? 500 : videoHeight;
    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Image
            style={styles.userImage}
            source={{uri: tweet.user.profile_image_url.replace('_normal', '')}}
          />
          <View style={{flex: 1}}>
            <AnimatedText weight={600} style={styles.userHandle}>
              @{tweet.user.screen_name}
            </AnimatedText>
            <AnimatedText weight={600} style={styles.userName}>
              {tweet.user.name}
            </AnimatedText>
          </View>
          <AnimatedText style={styles.createdAt}>
            {moment(tweet.created_at).fromNow()}
          </AnimatedText>
        </View>
        <AnimatedText style={styles.text}>
          <ParsedText
            style={styles.tweetBody}
            parse={[
              {type: 'url', style: styles.link},
              {pattern: /\[(@[^:]+):([^\]]+)\]/i, style: styles.link},
              {pattern: /#(\w+)/, style: styles.link},
            ]}
            childrenProps={{allowFontScaling: false}}>
            {tweet.text}
          </ParsedText>
          {tweet.text}
        </AnimatedText>
        <View style={styles.videoContainer}>
          <Video
            endWithThumbnail
            disableSeek
            pauseOnPress
            video={{uri: video}}
            thumbnail={{uri: thumbnail}}
            style={styles.video}
            videoWidth={videoWidth}
            videoHeight={finalHeight}
          />
        </View>
        <View style={styles.actionContainer}>
          <View style={styles.row}>
            <Icon
              style={styles.icon}
              name="retweet"
              size={16}
              color={textSecondary}
            />
            <AnimatedText style={styles.count}>
              {tweet.retweet_count}
            </AnimatedText>
          </View>
          <View style={styles.row}>
            <Icon
              style={styles.icon}
              name="heart"
              size={16}
              color={textSecondary}
            />
            <AnimatedText style={styles.count}>
              {tweet.favorite_count}
            </AnimatedText>
          </View>
        </View>
      </View>
    );
  }
}
