import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Platform,
  ActivityIndicator,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import {styles} from './HeaderStyles';
import Store from 'react-native-simple-store';
import AnimatedText from '../AnimatedText/AnimatedText';
import {getTeams} from '../../api/fantasy';
import reactotron from 'reactotron-react-native';
import {mapUserTeams} from '../../utils/fantasy/userHelper';
import {refreshToken} from '../../utils/fantasy/tokenHelper';
import Modal from 'react-native-modal';
import Rate, {AndroidMarket} from 'react-native-rate';
import {oAuthYahooFantasy, getToken} from '../../api/yahoo_fantasy';
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
  type ProductPurchase,
  type PurchaseError,
} from 'react-native-iap';
import moment from 'moment';
import {cardBackground, textSecondary} from '../../Theme';
const products = Platform.select({
  android: [
    'fastbreak.supportme',
    'fastbreak.supportme250',
    'fastbreak.supportme500',
  ],
});

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      image_url: null,
      teams: [],
      access_token: '',
      refresh_token: '',
      noToken: false,
      prodcutsLoading: true,
    };
  }

  componentDidMount() {
    Store.get('user_picture').then(image_url => {
      if (image_url) {
        this.setState({image_url: image_url});
      }
    });
  }

  getProducts() {
    RNIap.getProducts(products)
      .then(availableProducts => {
        RNIap.getAvailablePurchases().then(purchases => {
          reactotron.log('products', availableProducts);
          reactotron.log('purchases', purchases);
          this.setState({
            purchases: purchases,
            availableProducts: availableProducts,
            prodcutsLoading: false,
            purchasesLoading: false,
          });
        });
      })
      .catch(err => reactotron.log(err));
  }

  fetchTeams(token) {
    getTeams(token.access_token).then(data => {
      if (data.error) {
        reactotron.log('Token has expired, refreshing token');
        this.refreshToken(token.refresh_token);
      }
      const teams = mapUserTeams(data.fantasy_content.users[0].user[1].games);
      this.setState({loading: false, teams: teams[0].teams});
    });
  }

  openProfile() {
    this.getProducts();
    Store.get('yahoo_token').then(token => {
      if (token) {
        this.fetchTeams(token);
        this.setState({modalVisible: true});
      } else {
        this.setState({modalVisible: true, loading: false});
        // this.props.navigation.navigate('Login');
      }
    });
  }

  renderUserPicture = () => {
    const {image_url} = this.state;
    if (image_url) {
      return <Image source={{uri: image_url}} style={styles.logoFantasy} />;
    }
    return (
      <View style={styles.userIcon}>
        <Icon2 name="md-person" size={18} color="#aaa" />
      </View>
    );
  };

  refreshToken(refresh_token) {
    refreshToken(refresh_token).then(token => {
      reactotron.log('new token: ', token);
      this.fetchTeams(token);
    });
  }

  handleTeamPress(team) {
    Store.update('user_picture', team.team_logos[0].url);
    Store.update('team_key', team.team_key);
    this.setState({modalVisible: false});
    this.props.navigation.navigate('FantasyTabs', team);
  }

  renderTeam = team => {
    return (
      <TouchableOpacity
        style={styles.teamContainer}
        onPress={() => this.handleTeamPress(team)}>
        <Image
          source={{uri: team.team_logos[0].url}}
          style={styles.teamImage}
        />
        <View style={styles.teamInfoContainer}>
          <AnimatedText weight={500} style={styles.teamName}>
            {team.name}
          </AnimatedText>
          <View style={{flexDirection: 'row'}}>
            <AnimatedText style={styles.teamInfo}>
              Moves: {team.number_of_moves}
            </AnimatedText>
            <AnimatedText style={styles.teamInfo}>
              Trades: {team.number_of_trades}
            </AnimatedText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderTeams = () => {
    const {teams, loading} = this.state;
    if (teams.length === 0) {
      return (
        <View>
          <AnimatedText weight={700} style={styles.header}>
            Login to manage your Yahoo fantasy teams
          </AnimatedText>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.yahooLogin()}>
            <AnimatedText weight={700} style={styles.buttonText}>
              Sign in to Yahoo fantasy
            </AnimatedText>
          </TouchableOpacity>
        </View>
      );
    } else if (loading) {
      return <ActivityIndicator size="small" color="#fff" />;
    }
    return (
      <FlatList
        style={styles.teamList}
        ListHeaderComponent={
          <AnimatedText weight={700} style={styles.header}>
            Fantasy Teams
          </AnimatedText>
        }
        data={this.state.teams}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => this.renderTeam(item)}
      />
    );
  };

  rateApp() {
    const options = {
      AppleAppID: '2193813192',
      GooglePackageName: 'com.fastbreak.nba',
      AmazonPackageName: 'com.fastbreak.nba',
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: false,
      openAppStoreIfInAppFails: true,
    };
    Rate.rate(options, success => {
      if (success) {
        // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
        this.setState({rated: true});
      }
    });
  }

  yahooLogin() {
    oAuthYahooFantasy().then(response => {
      reactotron.log(response);
      Linking.openURL(response.url);
      Linking.addEventListener('url', responseUrl => {
        getToken(responseUrl.url.split('code=')[1]).then(token => {
          console.log(token);
          Store.update('yahoo_token', {
            access_token: token.access_token,
            refresh_token: token.refresh_token,
            time_generated: moment(),
          }).then(() => {
            this.setState(
              {
                loading: true,
                access_token: token.access_token,
                refresh_token: token.refresh_token,
                time_generated: moment(),
              },
              () => {
                this.fetchTeams(token);
              },
            );
          });
        });
      });
    });
  }

  requestPurchase(productId) {
    RNIap.requestPurchase(productId, false);
  }

  renderPrice = product => {
    const {purchases} = this.state;
    const purchasedProduct = purchases.find(purchase => {
      return purchase.productId === product.productId;
    });
    reactotron.log(purchasedProduct);
    if (purchasedProduct && purchasedProduct !== 'fastbreak.supportme') {
      return (
        <Icon3
          name="check-circle"
          color="green"
          size={26}
          style={{alignSelf: 'center'}}
        />
      );
    }
    return product.localizedPrice;
  };

  renderProductItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => this.requestPurchase(item.productId)}
        style={[styles.row, styles.product]}>
        <View style={{flex: 1}}>
          <AnimatedText weight={500} style={styles.productTitle}>
            {item.title.replace(
              '(Fastbreak: Live NBA Score, Stats and Fantasy)',
              '',
            )}
          </AnimatedText>
          <AnimatedText style={styles.productDescription}>
            {item.description}
          </AnimatedText>
        </View>
        <AnimatedText weight={600} style={styles.productPrice}>
          {this.renderPrice(item)}
        </AnimatedText>
      </TouchableOpacity>
    );
  };

  renderProducts = () => {
    const {availableProducts, prodcutsLoading, purchasesLoading} = this.state;
    reactotron.log(prodcutsLoading);
    reactotron.log(purchasesLoading);
    if (prodcutsLoading || purchasesLoading) {
      return <ActivityIndicator size="small" color="white" />;
    }
    return (
      <FlatList
        style={{backgroundColor: cardBackground}}
        data={availableProducts}
        ListHeaderComponent={
          <View style={{marginBottom: 10}}>
            <AnimatedText weight={700} style={styles.header}>
              Remove Ads
            </AnimatedText>
            <View style={styles.row}>
              <Icon
                name="infocirlceo"
                color={textSecondary}
                size={14}
                style={{alignSelf: 'center', marginTop: -12.5, marginRight: 5}}
              />
              <AnimatedText style={styles.info}>
                Restart app if changes do not take effect immediately
              </AnimatedText>
            </View>
          </View>
        }
        keyExtractor={item => item.productId}
        renderItem={this.renderProductItem}
      />
    );
  };

  render() {
    const {loading, modalVisible} = this.state;
    return (
      <View style={[styles.container, styles.row]}>
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={() => this.openProfile()}>
          {this.renderUserPicture()}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.input}
          onPress={() => this.props.navigation.navigate('Search')}>
          <AnimatedText weight={500} style={styles.text}>
            Search
          </AnimatedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => this.props.navigation.navigate('Calendar')}>
          <Icon name="calendar" color="#666" size={24} style={styles.icon} />
        </TouchableOpacity>
        <Modal
          useNativeDriver
          isVisible={modalVisible}
          style={styles.modal}
          swipeDirection={['down']}
          onBackdropPress={() => this.setState({modalVisible: false})}>
          <View style={styles.modalContent}>
            <View>{this.renderTeams()}</View>
            {this.renderProducts()}
          </View>
          <View style={styles.rateButtonContainer}>
            <TouchableOpacity
              style={styles.rateButton}
              onPress={() => this.rateApp()}>
              <AnimatedText weight={700} style={styles.rateText}>
                Rate App
              </AnimatedText>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
