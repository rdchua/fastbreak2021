import axios from 'axios';
import reactotron from 'reactotron-react-native';
const base = 'https://data.nba.net/prod';
const version = 'v2';
const year = '2019';

export const getScoreboard = date => {
  return axios.get(`${base}/v2/${date}/scoreboard.json`);
};

export const getRecapArticle = (gameDate, gameId) => {
  return axios.get(`${base}/v1/${gameDate}/${gameId}_recap_article.json`);
};

export const getPreviewArticle = (gameDate, gameId) => {
  return axios.get(`${base}/v1/${gameDate}/${gameId}_preview_article.json`);
};

export const getBoxscore = (gameDate, gameId) => {
  return axios.get(`${base}/v1/${gameDate}/${gameId}_boxscore.json`);
};

export const getPlayByPlay = (gameDate, gameId, periodNum) => {
  return axios.get(`${base}/v1/${gameDate}/${gameId}_pbp_${periodNum}.json`);
};

export const getGameLog = personId => {
  return axios.get(`${base}/v1/2019/players/${personId}_gamelog.json`);
};

export const getSchedule = teamUrlName => {
  return axios.get(`${base}/v1/2019/teams/${teamUrlName}/schedule.json`);
};

export const getPlayerProfile = personId => {
  return axios.get(`${base}/v1/2019/players/${personId}_profile.json`);
};

export const getPlayers = () => {
  return axios.get(`${base}/v1/2019/players.json`);
};

export const getTeamLeaders = teamUrlCode => {
  return axios.get(`${base}/v1/2019/teams/${teamUrlCode}/leaders.json`);
};

export const getConferenceStandings = () => {
  return axios.get(`${base}/v1/current/standings_conference.json`);
};

export const getDivisionStandings = () => {
  return axios.get(`${base}/v1/current/standings_division.json`);
};

export const getOverallStandings = () => {
  return axios.get(`${base}/v1/current/standings_all.json`);
};

export const getRoster = urlName => {
  return axios.get(`${base}/v1/2019/teams/${urlName}/roster.json`);
};

export const getTeamSchedule = urlName => {
  return axios.get(`${base}/v1/2019/teams/${urlName}/schedule.json`);
};

export const headshot = personId => {
  return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${personId}.png`;
  /**
   * https://nlnbamdnyc-a.akamaihd.net/nba/media/img/players/head/132x132/201939.png
   * This is an alternate link for player headshots. Just replace the last number to the persion ID
   * of the player. This links is what the official NBA website uses for their images.
   */
};
