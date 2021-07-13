import React, {Component} from 'react';
import {View, ScrollView, StatusBar} from 'react-native';
import {styles} from './Article.styles';
import AnimatedText from '../../components/AnimatedText/AnimatedText';
import reactotron from 'reactotron-react-native';
import moment from 'moment';
import {accent, red} from '../../Theme';
import firebase from 'react-native-firebase';
import {validatePurchase} from '../../utils/helper';
export default class Article extends Component {
  componentDidMount() {
    validatePurchase('News');
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerStyle: {
        elevation: 6,
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
    };
  };

  renderInjury = article => {
    let rotowire = this.props.navigation.state.params.rotowire;
    if (rotowire) {
      return (
        <AnimatedText
          weight={600}
          style={[
            styles.injury,
            {
              color: article.injured === 'YES' ? red : accent,
            },
          ]}>
          {article.injuryStatus}
        </AnimatedText>
      );
    }
  };

  renderText = () => {
    let rotowire = this.props.navigation.state.params.rotowire;
    if (rotowire) {
      return (
        <AnimatedText
          weight={600}
          style={[styles.headline, {paddingHorizontal: 12}]}>
          Analysis:
        </AnimatedText>
      );
    }
  };

  render() {
    const article = this.props.navigation.state.params;
    reactotron.log(article);
    return (
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor="#000" />
        <View style={styles.headlineContainer}>
          <AnimatedText weight={600} style={styles.headline}>
            {article.title}
          </AnimatedText>
          <View style={styles.infoContainer}>
            {this.renderInjury(article)}
            <AnimatedText weight={600} style={styles.author}>
              {article.author.replace('By', '')}
            </AnimatedText>
            <AnimatedText style={styles.date}>{article.date}</AnimatedText>
          </View>
        </View>
        <AnimatedText style={styles.caption}>{article.caption}</AnimatedText>
        {this.renderText()}
        <AnimatedText style={styles.description}>
          {article.description}
        </AnimatedText>
      </ScrollView>
    );
  }
}
