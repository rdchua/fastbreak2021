import React, {Component} from 'react';
import {FlatList, View, Image} from 'react-native';
import {styles} from './Feed.styles';
import {getVideoHighlights} from '../../../api/youtube';
import {getTeamDetails} from '../../../utils/helper';
import reactotron from 'reactotron-react-native';
import Loading from '../../../components/Loading/Loading';
import Video from '../../../components/Video/Video';
import {darkBackground} from '../../../Theme';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: this.props.gameDetails,
      videosLoading: true,
    };
  }

  componentDidMount() {
    this.fetchVideos();
  }

  fetchVideos() {
    const {game} = this.state;
    const homeTeam = getTeamDetails(game.hTeam.teamId);
    const awayTeam = getTeamDetails(game.vTeam.teamId);
    getVideoHighlights(homeTeam, awayTeam, 8).then(response => {
      this.setState({videos: response.data.items, videosLoading: false});
    });
  }

  renderVideo = ({item, index}) => {
    return <Video video={item} />;
  };

  render() {
    if (this.state.videosLoading) {
      return <Loading backgroundColor={darkBackground} />;
    }
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={this.state.videos}
          keyExtractor={item => item.id.videoId}
          renderItem={this.renderVideo}
        />
      </View>
    );
  }
}
