/* eslint-disable prettier/prettier */
import axios from 'axios';
import reactotron from 'reactotron-react-native';
const base = 'https://stats.nba.com/stats';
const season = '2019-20';

export const headers = {
  headers: {
    Host: 'stats.nba.com',
    Connection: 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    Referer: 'https://stats.nba.com/', //will not work without this header
  },
};

/**
 *
 * @param {*} personId;
 * @param {'Regular Season', 'Playoffs', etc} type;
 */
export const getGameLog = (personId, type) => {
  return axios.get(
    `${base}/playergamelog?PlayerID=${personId}&Season=${season}&SeasonType=${type}`,
    headers,
  );
};

export const getSeasonAvg = personId => {
  return axios(
    `${base}/playerdashboardbyyearoveryear?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerID=${personId}&PlusMinus=N&Rank=N&Season=2018-19&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=yoy&VsConference=&VsDivision=`,
    headers,
  );
};

export const getFantasyNews = (firstName, lastName) => {
  return axios(
    `https://stats-prod.nba.com/wp-json/statscms/v1/rotowire/player/?player=${firstName} ${lastName}&limit=25`,
  );
};

export const getTeamStats = () => {
  return axios.get(
    `${base}/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=${season}&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision=`,
    headers,
  );
};

export const getStatLeader = (category, mode) => {
  return axios.get(
    `https://stats.nba.com/stats/leagueLeaders?LeagueID=00&PerMode=${mode}&Scope=S&Season=2019-20&SeasonType=Regular+Season&StatCategory=${category}`,
    headers,
  );
};
