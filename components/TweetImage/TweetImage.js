import React, {PureComponent} from 'react';
import {View, TouchableOpacity, Image, Dimensions} from 'react-native';
import {styles} from './TweetImage.styles';
import AnimatedText from './../AnimatedText/AnimatedText';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import {textSecondary} from '../../Theme';
import ParsedText from 'react-native-parsed-text';
const screenWidth = Dimensions.get('window').width;
export default class TweetImage extends PureComponent {
  render() {
    const {tweet} = this.props;
    const image = tweet.extended_entities.media[0].media_url_https;
    const imageWidth = tweet.extended_entities.media[0].sizes.small.w;
    const imageHeight = tweet.extended_entities.media[0].sizes.small.h;
    const displayHeight = screenWidth * (imageHeight / imageWidth);
    const finalHeight = displayHeight > 500 ? 500 : displayHeight;
    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Image
            style={styles.userImage}
            source={{
              uri: tweet.user.profile_image_url_https.replace('_normal', ''),
            }}
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
        <Image
          source={{uri: image}}
          style={[styles.image, {height: finalHeight}]}
        />
        <View style={styles.actionContainer}>
          <Icon
            style={styles.icon}
            name="share"
            size={16}
            color={textSecondary}
          />
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
