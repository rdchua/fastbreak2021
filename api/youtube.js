const key = 'AIzaSyDEi4HOiHEsj42H9w-O0RgXaIoodkPe548';
import moment from 'moment';
import axios from 'axios';
import reactotron from 'reactotron-react-native';

export const headers = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
  },
};

export const getVideoHighlights = (homeTeam, awayTeam, max) => {
  const date = moment().format('MMMM YYYY');
  // eslint-disable-next-line prettier/prettier
  const query = `${homeTeam.nickName} vs ${awayTeam.nickName} ${date} Highlights`;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet,id&order=date&maxResults=${max}&q=${query}&key=${key}`;
  return axios.get(url, headers).catch(err => reactotron.log(err));
};

export const getVideos = channelId => {
  return axios.get(
    `https://www.googleapis.com/youtube/v3/playlistItems/?key=AIzaSyDEi4HOiHEsj42H9w-O0RgXaIoodkPe548&playlistId=${channelId}&part=snippet,id,contentDetails&order=date&maxResults=25`,
  );
};
