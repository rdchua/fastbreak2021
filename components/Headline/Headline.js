import React, {Component} from 'react';
import {Image, TouchableOpacity, View, Linking} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {styles} from './Headline.styles';
import AnimatedText from '../AnimatedText/AnimatedText';

export default class Headline extends Component {
  constructor(props) {
    super(props);
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
          onPress={() => Linking.openURL(article.source)}>
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
