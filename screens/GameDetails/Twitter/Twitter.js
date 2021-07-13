import React, {Component} from 'react';
import {View, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from './Twitter.styles';
import Store from 'react-native-simple-store';
import reactotron from 'reactotron-react-native';
import {getTeamFeed, twitterHeaders} from '../../../api/twitter';
import axios from 'axios';
import {getTeamDetails} from '../../../utils/helper';
import {sortBy} from 'underscore';
import moment from 'moment';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {
  skeleton,
  skeletonHighlight,
  twitterLayout,
  twitterStyle,
} from '../../../Theme';
import TweetImage from '../../../components/TweetImage/TweetImage';
import TweetVideo from '../../../components/TweetVideo/TweetVideo';
import Tweet from '../../../components/Tweet/Tweet';
export default class Twitter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetsLoading: true,
      game: this.props.gameDetails,
      refreshing: false,
    };
  }
  componentDidMount() {
    Store.get('twitterToken').then(token => {
      this.fetchTweets(token);
    });
  }

  fetchTweets(token) {
    const {game} = this.state;
    const homeTeam = getTeamDetails(game.hTeam.teamId);
    const awayTeam = getTeamDetails(game.vTeam.teamId);
    Promise.all([
      axios.get(getTeamFeed(homeTeam.twitterName, 30), twitterHeaders(token)),
      axios.get(getTeamFeed(awayTeam.twitterName, 30), twitterHeaders(token)),
    ])
      .then(([homeTweets, awayTweets]) => {
        const sortedTweets = sortBy(
          homeTweets.data.concat(awayTweets.data),
          data => {
            return moment(data.created_at);
          },
        ).reverse();
        reactotron.log('sorted', sortedTweets);
        this.setState({
          tweetsLoading: false,
          tweets: sortedTweets,
          refreshing: false,
        });
      })
      .catch(err => reactotron.log(err));
  }

  renderTweet = ({item, index}) => {
    if (item.extended_entities) {
      //if tweet has media (image or video)
      const mediaType = item.extended_entities.media[0].type;
      if (mediaType === 'photo') {
        return <TweetImage tweet={item} />;
      } else if (mediaType === 'video') {
        return <TweetVideo tweet={item} />;
      }
    }
    return <Tweet tweet={item} />;
  };

  render() {
    const {tweets, tweetsLoading} = this.state;
    if (tweetsLoading) {
      return (
        <View style={styles.container}>
          <SkeletonContent
            layout={twitterLayout}
            containerStyle={twitterStyle}
            boneColor={skeleton}
            highlightColor={skeletonHighlight}
          />
        </View>
      );
    }
    return (
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <FlatList
          removeClippedSubviews={true}
          data={tweets}
          keyExtractor={item => item.id}
          renderItem={this.renderTweet}
        />
      </ScrollView>
    );
  }
}
