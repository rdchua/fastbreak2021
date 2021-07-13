import teams from './../data/teams.json';
import reactotron from 'reactotron-react-native';
import statcategories from './../data/statCategories.json';
import moment from 'moment';
import firebase from 'react-native-firebase';
import RNIap from 'react-native-iap';

export const getTeamImage = teamTriCode => {
  let source;
  switch (teamTriCode) {
    case 'ATL':
      source = require('../assets/images/ATL_logo.png');
      break;
    case 'BOS':
      source = require('../assets/images/BOS_logo.png');
      break;
    case 'BKN':
      source = require('../assets/images/BKN_logo.png');
      break;
    case 'CHA':
      source = require('../assets/images/CHA_logo.png');
      break;
    case 'CHI':
      source = require('../assets/images/CHI_logo.png');
      break;
    case 'CLE':
      source = require('../assets/images/CLE_logo.png');
      break;
    case 'DAL':
      source = require('../assets/images/DAL_logo.png');
      break;
    case 'DEN':
      source = require('../assets/images/DEN_logo.png');
      break;
    case 'DET':
      source = require('../assets/images/DET_logo.png');
      break;
    case 'GSW':
      source = require('../assets/images/GSW_logo.png');
      break;
    case 'GS':
      source = require('../assets/images/GSW_logo.png');
      break;
    case 'HOU':
      source = require('../assets/images/HOU_logo.png');
      break;
    case 'IND':
      source = require('../assets/images/IND_logo.png');
      break;
    case 'LAC':
      source = require('../assets/images/LAC_logo.png');
      break;
    case 'LAL':
      source = require('../assets/images/LAL_logo.png');
      break;
    case 'MEM':
      source = require('../assets/images/MEM_logo.png');
      break;
    case 'MIA':
      source = require('../assets/images/MIA_logo.png');
      break;
    case 'MIL':
      source = require('../assets/images/MIL_logo.png');
      break;
    case 'MIN':
      source = require('../assets/images/MIN_logo.png');
      break;
    case 'NOP':
      source = require('../assets/images/NOP_logo.png');
      break;
    case 'NYK' || 'NY':
      source = require('../assets/images/NYK_logo.png');
      break;
    case 'NY':
      source = require('../assets/images/NYK_logo.png');
      break;
    case 'OKC':
      source = require('../assets/images/OKC_logo.png');
      break;
    case 'ORL':
      source = require('../assets/images/ORL_logo.png');
      break;
    case 'PHI':
      source = require('../assets/images/PHI_logo.png');
      break;
    case 'PHX':
      source = require('../assets/images/PHX_logo.png');
      break;
    case 'Pho':
      source = require('../assets/images/PHX_logo.png');
      break;
    case 'POR':
      source = require('../assets/images/POR_logo.png');
      break;
    case 'SAC':
      source = require('../assets/images/SAC_logo.png');
      break;
    case 'SAS':
      source = require('../assets/images/SAS_logo.png');
      break;
    case 'SA':
      source = require('../assets/images/SAS_logo.png');
      break;
    case 'TOR':
      source = require('../assets/images/TOR_logo.png');
      break;
    case 'UTA':
      source = require('../assets/images/UTA_logo.png');
      break;
    case 'WAS':
      source = require('../assets/images/WAS_logo.png');
      break;
    case 'NBA':
      source = require('../assets/images/NBA_logo.png');
      break;
    default:
      source = require('../assets/images/NBA_logo.png');
      break;
  }
  return source;
};

export const getTeamDetails = teamId => {
  let found = teams.find(currTeam => {
    return parseInt(currTeam.teamId) === parseInt(teamId);
  });
  if (found) {
    return found;
  }
  found = {
    isNBAFranchise: false,
    primaryColorRgba: 'rgba(85,85,85,1)',
    city: '',
    altCityName: '',
    fullName: '',
    tricode: '',
    teamId: '',
    nickname: 'Team',
    urlName: '',
    confName: '',
    divName: '',
    primaryColor: '#555',
    twitterName: '',
  };
  return found;
};

export const getTeamDetailsByCode = triCode => {
  let found = teams.find(currTeam => {
    return currTeam.triCode === triCode;
  });
  if (found) {
    return found;
  }
  found = {
    isNBAFranchise: false,
    primaryColorRgba: 'rgba(85,85,85,1)',
    city: '',
    altCityName: '',
    fullName: '',
    tricode: '',
    teamId: '',
    nickname: 'Team',
    urlName: '',
    confName: '',
    divName: '',
    primaryColor: '#555',
    twitterName: '',
  };
  return found;
};

export const sortPlayersByTeam = (players, homeTeamId, awayTeamId) => {
  let homeTeam = [];
  let awayTeam = [];
  players.forEach(player => {
    if (player.teamId === homeTeamId) {
      homeTeam.push(player);
    } else {
      awayTeam.push(player);
    }
  });
  return {
    homTeam: homeTeam,
    awayTeam: awayTeam,
  };
};

export const toOrdinal = period => {
  var j = period % 10,
    k = period % 100;
  if (j === 1 && k !== 11) {
    return period + 'st';
  }
  if (j === 2 && k !== 12) {
    return period + 'nd';
  }
  if (j === 3 && k !== 13) {
    return period + 'rd';
  }
  if (j === 4) {
    return '4th';
  }
  return 'OT' + period;
};

export const toRank = rank => {
  if (rank === 1) {
    return rank + 'st';
  }
  if (rank === 2) {
    return rank + 'nd';
  }
  if (rank === 3) {
    return rank + 'rd';
  }
  if (rank > 3) {
    return rank + 'th';
  }
};

export const getPlayerDetails = (players, personId) => {
  return players.find(person => person.personId === personId);
};

export const getPlayerDetailsByName = (players, fullName) => {
  return players.find(
    person => `${person.firstName} ${person.lastName}` === fullName,
  );
};

export const getStatCategory = stat_id => {
  const category = statcategories.filter(cat => {
    return parseInt(cat.stat_id) === parseInt(stat_id);
  });
  if (category.length === 0) {
    if (parseInt(stat_id) === 9004003) {
      return 'FGM/A';
    } else if (parseInt(stat_id) === 9007006) {
      return 'FTM/A';
    }
  } else {
    return category[0].display_name;
  }
};

export const getTime = game => {
  const startTime = moment(game.startTimeUTC).format('hh:mm');
  const startTimeA = moment(game.startTimeUTC).format('a');
  if (game.statusNum === 1) {
    return `${startTime} ${startTimeA}`;
  } else if (game.statusNum === 2) {
    if (game.period.isHalfTime) {
      return 'HALF';
    } else if (game.period.isEndOfPeriod) {
      return `END OF Q${game.period.current}`;
    }
    return game.period.current > 4
      ? `${game.period.current % 4} OT - ${game.clock}`
      : `Q${game.period.current} - ${game.clock}`;
  } else if (game.statusNum === 3) {
    return game.period.current > 4
      ? `FINAL ${game.period.current % 4} OT`
      : 'FINAL';
  }
};

export const validatePurchase = adType => {
  reactotron.log(adType);
  RNIap.getAvailablePurchases().then(purchases => {
    reactotron.log(purchases);
    const purchasedProduct = purchases.find(purchase => {
      return (
        purchase.productId === 'fastbreak.supportme250' ||
        purchase.productId === 'fastbreak.supportme500'
      );
    });
    reactotron.log(purchasedProduct);
    if (!purchasedProduct) {
      showAd(adType);
    }
  });
};

function showAd(adType) {
  const ad =
    adType === 'Game Details'
      ? 'ca-app-pub-6010622074415721/9800455550'
      : 'ca-app-pub-6010622074415721/6599577140';
  const advert = firebase.admob().interstitial(ad);
  // .interstitial('ca-app-pub-1108597602432224/5355417587'); for news
  // .interstitial('ca-app-pub-1108597602432224/5782605644'); for game details
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
