import React, {Component} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {styles} from './News.styles';
import {getNews1, clutchpoints, getPlayerNews} from '../../api/news';
import {getVideos, getUserVideos} from '../../api/youtube';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header/Header';
import Card from '../../components/Card/Card';
import reactotron from 'reactotron-react-native';
import Loading from '../../components/Loading/Loading';
import AnimatedText from '../../components/AnimatedText/AnimatedText';
import Headline from '../../components/Headline/Headline';
import * as theme from '../../Theme';
import Rotowire from '../../components/Rotowire/Rotowire';
import ItemSeparator from '../../components/ItemSeparator';
import NewsFeed from '../../components/NewsFeed/NewsFeed';
import Video2 from '../../components/Video2/Video2';
import Modal from 'react-native-modal';
import {sortBy} from 'underscore';
import moment from 'moment';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {validatePurchase} from '../../utils/helper';
const gradient = [
  'transparent',
  'rgba(18, 19, 20, 0.3)',
  'rgba(18, 19, 20, 0.5)',
  'rgba(18, 19, 20, 1)',
];

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsLoading: true,
      rotowireLoading: true,
      othersLoading: true,
      videosLoading: true,
    };
  }

  componentDidMount() {
    this.fetchArticles();
    this.fetchPlayerNews();
    this.fetchOtherNews();
    this.fetchVideos();
  }

  fetchArticles() {
    clutchpoints().then(response => {
      reactotron.log('articles', response);
      this.setState({
        news: response.data.results,
        newsLoading: false,
      });
    });
  }

  fetchPlayerNews() {
    getPlayerNews().then(response => {
      this.setState({
        rotowire: response.data.ListItems,
        rotowireLoading: false,
      });
    });
  }

  fetchOtherNews() {
    getNews1().then(response => {
      this.setState({
        otherNews: response.data.data.articles,
        othersLoading: false,
      });
    });
  }

  fetchVideos() {
    /**
     * Channels Id's:
     * NBA on ESPN = UUVSSpcmZD2PwPBqb8yKQKBA (channel1)
     * NBA on TNT    = UCpGimyrbwRtrcJ-CIiRDXbA (channel2)
     */
    const channel1 = 'UUVSSpcmZD2PwPBqb8yKQKBA';
    const channel2 = 'UUWJ2lWNubArHWmf3FIHbfcQ';
    Promise.all([getVideos(channel1), getVideos(channel2)])
      .then(([espn, tnt]) => {
        let videos = sortBy(espn.data.items.concat(tnt.data.items), video =>
          moment(video.snippet.publishedAt),
        );
        videos = videos.reverse();
        reactotron.log('videos', videos);
        this.setState({
          videos: videos,
          videosLoading: false,
        });
      })
      .catch(err => reactotron.log(err));
  }

  renderHeadline = ({item, index}) => {
    return (
      <View style={styles.headlineContainer}>
        <Headline article={item} />
      </View>
    );
  };

  renderItemSeparator = () => {
    return <ItemSeparator />;
  };

  renderRotowire = () => {
    const {rotowire, rotowireLoading} = this.state;
    if (rotowireLoading) {
      return (
        <View style={{flex: 1}}>
          <SkeletonContent
            boneColor={theme.skeleton}
            highlightColor={theme.skeletonHighlight}
            layout={theme.rotowireLayout}
            containerStyle={theme.rotowireStyle}
          />
          <SkeletonContent
            boneColor={theme.skeleton}
            highlightColor={theme.skeletonHighlight}
            layout={theme.rotowireLayout}
            containerStyle={theme.rotowireStyle}
          />
          <SkeletonContent
            boneColor={theme.skeleton}
            highlightColor={theme.skeletonHighlight}
            layout={theme.rotowireLayout}
            containerStyle={theme.rotowireStyle}
          />
        </View>
      );
    }
    return (
      <FlatList
        data={rotowire.slice(0, 3)}
        ItemSeparatorComponent={this.renderItemSeparator}
        keyExtractor={item => item.UpdateId}
        renderItem={this.renderRotowireItem}
      />
    );
  };

  renderRotowireItem = ({item, index}) => {
    let article = {
      title: item.Headline,
      date: moment(item.ListItemPubDate, 'MM/DD/YYYY hh:mm:ss a').format(
        'dddd, MMM DD YYYY hh:mm a',
      ),
      caption: item.ListItemCaption,
      description: item.ListItemDescription,
      injured: item.Injured,
      injuryStatus: item.Injured_Status,
      rotowire: true,
      author: 'Rotowire',
      authorTitle: '',
    };
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({modalVisible: false});
          this.props.navigation.navigate('Article', article);
        }}>
        <Rotowire player={item} />
      </TouchableOpacity>
    );
  };

  renderOtherNews = ({item, index}) => {
    return <NewsFeed article={item} />;
  };

  renderOthers = () => {
    const {othersLoading, otherNews} = this.state;
    if (othersLoading) {
      return (
        <View style={{flex: 1}}>
          <SkeletonContent
            boneColor={theme.skeleton}
            highlightColor={theme.skeletonHighlight}
            layout={theme.otherNewsLayout}
            containerStyle={theme.otherNewsStyle}
          />
          <SkeletonContent
            boneColor={theme.skeleton}
            highlightColor={theme.skeletonHighlight}
            layout={theme.otherNewsLayout}
            containerStyle={theme.otherNewsStyle}
          />
          <SkeletonContent
            boneColor={theme.skeleton}
            highlightColor={theme.skeletonHighlight}
            layout={theme.otherNewsLayout}
            containerStyle={theme.otherNewsStyle}
          />
          <SkeletonContent
            boneColor={theme.skeleton}
            highlightColor={theme.skeletonHighlight}
            layout={theme.otherNewsLayout}
            containerStyle={theme.otherNewsStyle}
          />
          <SkeletonContent
            boneColor={theme.skeleton}
            highlightColor={theme.skeletonHighlight}
            layout={theme.otherNewsLayout}
            containerStyle={theme.otherNewsStyle}
          />
        </View>
      );
    }
    return (
      <FlatList
        data={otherNews.slice(0, 5)}
        ItemSeparatorComponent={this.renderItemSeparator}
        keyExtractor={item => item.title}
        renderItem={this.renderOtherNews}
      />
    );
  };

  renderVideos = () => {
    const {videos, videosLoading} = this.state;
    if (videosLoading || !videos) {
      return (
        <View style={{flex: 1}}>
          <SkeletonContent
            boneColor={theme.skeleton}
            highlightColor={theme.skeletonHighlight}
            layout={theme.videosLayout}
            containerStyle={theme.videosStyle}
          />
          <SkeletonContent
            boneColor={theme.skeleton}
            highlightColor={theme.skeletonHighlight}
            layout={theme.videosLayout}
            containerStyle={theme.videosStyle}
          />
          <SkeletonContent
            boneColor={theme.skeleton}
            highlightColor={theme.skeletonHighlight}
            layout={theme.videosLayout}
            containerStyle={theme.videosStyle}
          />
          <SkeletonContent
            boneColor={theme.skeleton}
            highlightColor={theme.skeletonHighlight}
            layout={theme.videosLayout}
            containerStyle={theme.videosStyle}
          />
          <SkeletonContent
            boneColor={theme.skeleton}
            highlightColor={theme.skeletonHighlight}
            layout={theme.videosLayout}
            containerStyle={theme.videosStyle}
          />
        </View>
      );
    }
    return (
      <FlatList
        data={videos.slice(0, 5)}
        keyExtractor={item => item.id}
        renderItem={this.renderVideoItem}
      />
    );
  };

  renderVideoItem = ({item, index}) => {
    return <Video2 video={item} />;
  };

  renderModalContent() {
    const {modalContent, videos, rotowire, otherNews} = this.state;
    if (modalContent === 'players') {
      return (
        <FlatList
          ListHeaderComponent={
            <AnimatedText weight={700} style={styles.header}>
              Player News
            </AnimatedText>
          }
          showsVerticalScrollIndicator={false}
          style={{marginTop: -10}}
          data={rotowire}
          keyExtractor={(item, index) => item.RotoId}
          renderItem={this.renderRotowireItem}
        />
      );
    } else if (modalContent === 'news') {
      return (
        <FlatList
          ListHeaderComponent={
            <AnimatedText weight={700} style={styles.header}>
              League News
            </AnimatedText>
          }
          style={{flex: 1, marginTop: -10}}
          data={otherNews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderOtherNews}
        />
      );
    } else {
      return (
        <FlatList
          ListHeaderComponent={
            <AnimatedText weight={700} style={styles.header}>
              Videos
            </AnimatedText>
          }
          style={{flex: 1, marginTop: -10}}
          data={videos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderVideoItem}
        />
      );
    }
  }

  openNews(article) {
    validatePurchase();
    Linking.openURL(article.source);
  }

  renderHero = () => {
    const {newsLoading, news} = this.state;
    if (newsLoading) {
      return (
        <SkeletonContent
          layout={theme.newsHeroLayout}
          boneColor={theme.skeleton}
          highlightColor={theme.skeletonHighlight}
          containerStyle={theme.newsHeroStyle}
        />
      );
    }
    return (
      <View style={styles.heroContainer}>
        <View style={styles.hero}>
          <TouchableOpacity>
            <Image source={{uri: news[3].cover}} style={styles.heroImage} />
          </TouchableOpacity>
        </View>
        <LinearGradient colors={gradient} style={styles.heroContainer}>
          <View style={styles.heroTextContainer}>
            <AnimatedText style={styles.heroTextSnip}>FEATURED</AnimatedText>
            <AnimatedText style={styles.heroText} numberOfLines={3}>
              {news[3].title}
            </AnimatedText>
          </View>
        </LinearGradient>
      </View>
    );
  };

  renderArticles = () => {
    const {newsLoading, news} = this.state;
    if (newsLoading) {
      return <View style={{height: 150}}></View>;
    }
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.headline}
        contentContainerStyle={styles.headlineContent}
        data={news.slice(0, 25)}
        keyExtractor={item => item.id}
        renderItem={this.renderHeadline}
      />
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Header navigation={this.props.navigation} />
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.container}>
          {this.renderHero()}
          {this.renderArticles()}
          <Card
            handleMore={() =>
              this.setState({
                modalContent: 'players',
                modalVisible: true,
              })
            }
            titleStyle={{marginBottom: 5}}
            title="Players"
            subtitle="See All">
            {this.renderRotowire()}
          </Card>
          <Card
            style={{height: 533.142}}
            handleMore={() =>
              this.setState({
                modalContent: 'news',
                modalVisible: true,
              })
            }
            titleStyle={{marginBottom: 5}}
            title="News"
            subtitle="See All">
            {this.renderOthers()}
          </Card>
          <Card
            style={{height: 599.714}}
            handleMore={() =>
              this.setState({
                modalContent: 'videos',
                modalVisible: true,
              })
            }
            titleStyle={{marginBottom: 5}}
            title="Videos"
            subtitle="See All">
            {this.renderVideos()}
          </Card>
        </ScrollView>
        <Modal
          useNativeDriver
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.setState({modalVisible: false})}
          style={styles.bottomModal}>
          <View style={styles.modalContent}>{this.renderModalContent()}</View>
        </Modal>
      </View>
    );
  }
}
