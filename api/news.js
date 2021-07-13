import axios from 'axios';
import reactotron from 'reactotron-react-native';

export const headers = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
  },
};

export const headers2 = {
  headers: {
    Authorization:
      'sBBqsGXiYgF0Db5OV5tAw-x0W6ysVPB1_iQbXZ06l3tgZBwSijbnllpRrG-qp2Mdn2pHZrSf1gT2PUujH1YaQA',
  },
};

export const rssFeed = urlName => {
  return `https://api.rss2json.com/v1/api.json?rss_url=https://www.nba.com/${urlName}/rss.xml`;
};

export const getTeamNews = urlName => {
  const url = `https://clutchpoints.4taps.me/articles/?term=${urlName}&limit=20&user_id=undefined`;
  return axios(url);
};

export const getPlayerNews = () => {
  return axios.get(
    'https://stats-prod.nba.com/wp-json/statscms/v1/rotowire/player/',
  );
};

export const getNews1 = () => {
  return axios(
    `https://wrapapi.com/use/rdchua30/fastbreak/nbanews/0.0.4?page=1&wrapAPIKey=7F9HjhAhwEYJKuPC2WhfCBTICMKnhIrd`,
  );
};

export const getNews2 = () => {
  return axios(
    `https://wrapapi.com/use/rdchua30/fastbreak/nbanews/0.0.4?page=2&wrapAPIKey=7F9HjhAhwEYJKuPC2WhfCBTICMKnhIrd`,
  );
};

export const getNews3 = () => {
  return axios(
    'https://api.newsriver.io/v2/search?query=text%3A%22nba%20basketball%22&sortBy=discoverDate&sortOrder=DESC&limit=30',
    headers2,
  );
};

export const clutchpoints = () => {
  return axios.get(
    `https://clutchpoints.4taps.me/articles/?category=nba&limit=20/`,
    headers,
  );
};
