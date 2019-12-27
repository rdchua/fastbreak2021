const client_id =
  'dj0yJmk9WHV5RkZPUklBaE0wJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTc0';
const client_secret = '3f7a7defdcd82ee75dcfea328d16c2876e55eb78';
import moment from 'moment';

export const login = token => {
  return fetch('https://fastbreak-node.herokuapp.com/login', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: token,
    }),
  });
};

export const getTeams = token => {
  return fetch(
    'https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=nba/teams?format=json',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then(response => response.json());
};

export const getMatchup = (team_key, token) => {
  return fetch(
    `https://fantasysports.yahooapis.com/fantasy/v2/team/${team_key}/matchups?format=json`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then(response => response.json());
};

export const getRoster = (team_key, token, type, date) => {
  let url = `https://fantasysports.yahooapis.com/fantasy/v2/team/${team_key}/roster/players/stats;`;
  if (type === 'season') {
    url += 'type=season?format=json';
  } else if (type === 'week') {
    url += `type=week;week=${date}?format=json`;
  } else {
    url += `type=date;date=${date}?format=json`;
  }
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json());
};

export const getLeaguePlayers = (token, league_key, filters, subresources) => {
  let url = `https://fantasysports.yahooapis.com/fantasy/v2/leagues;league_keys=${league_key}/players;out=${subresources.join(
    ',',
  )}`;
  if (Object.keys(filters).length) {
    Object.keys(filters).forEach(key => {
      url += `;${key}=${filters[key]}`;
    });
  }
  url += '?format=json';
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json());
};

export const getLeagueTeams = (token, league_key, subresources) => {
  let url = `https://fantasysports.yahooapis.com/fantasy/v2/leagues;league_keys=${league_key}/teams`;
  if ('string' === typeof subresources) {
    subresources = [subresources];
  }
  if (subresources.length) {
    url += `;out=${subresources.join(',')}`;
  }
  url += '?format=json';
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json());
};

export const getStatCategories = (league_key, token) => {
  return fetch(
    `https://fantasysports.yahooapis.com/fantasy/v2/league/${league_key}/settings?format=json`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then(response => response.json());
};

export const getPlayerStatsForWeek = (player_key, week) => {
  return fetch('https://fastbreak-node.herokuapp.com/playerStats', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      player_key: player_key,
      week: week,
    }),
  }).then(response => response.json());
};

export const getTransactionTrends = (token, league_key) => {
  return fetch(
    `https://fantasysports.yahooapis.com/fantasy/v2/league/${league_key}/settings?format=json`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then(response => response.json());
};

export const addPlayer = (token, league_key, team_key, player_key) => {
  let url = `https://fantasysports.yahooapis.com/fantasy/v2/league/${league_key}/transactions?format=json`;
  let xmlData =
    ' \
        <fantasy_content> \
            <transaction> \
            <type>add</type> \
            <player> \
                <player_key>' +
    player_key +
    '</player_key> \
                <transaction_data> \
                <type>add</type> \
                <destination_team_key>' +
    team_key +
    '</destination_team_key> \
                </transaction_data> \
            </player> \
            </transaction> \
        </fantasy_content>';
  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/xml',
    },
    body: xmlData,
  }).then(response => response.json());
};

export const dropPlayer = (token, league_key, team_key, player_key) => {
  let url = `https://fantasysports.yahooapis.com/fantasy/v2/league/${league_key}/transactions?format=json`;
  var xmlData =
    ' \
        <fantasy_content> \
          <transaction> \
            <type>drop</type> \
            <player> \
              <player_key>' +
    player_key +
    '</player_key> \
              <transaction_data> \
                <type>drop</type> \
                <source_team_key>' +
    team_key +
    '</source_team_key> \
              </transaction_data> \
            </player> \
          </transaction> \
        </fantasy_content>';
  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/xml',
    },
    body: xmlData,
  }).then(response => response.json());
};

export const addDropPlayer = (
  token,
  league_key,
  team_key,
  addPlayer_key,
  dropPlayer_key,
) => {
  let url = `https://fantasysports.yahooapis.com/fantasy/v2/league/${league_key}/transactions?format=json`;
  var xmlData =
    ' \
        <fantasy_content> \
          <transaction> \
            <type>add/drop</type> \
            <players> \
              <player> \
                <player_key>' +
    addPlayer_key +
    '</player_key> \
                <transaction_data> \
                  <type>add</type> \
                  <destination_team_key>' +
    team_key +
    '</destination_team_key> \
                </transaction_data> \
              </player> \
              <player> \
                <player_key>' +
    dropPlayer_key +
    '</player_key> \
                <transaction_data> \
                  <type>drop</type> \
                  <source_team_key>' +
    team_key +
    '</source_team_key> \
                </transaction_data> \
              </player> \
            </players> \
          </transaction> \
        </fantasy_content>';
  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/xml',
    },
    body: xmlData,
  }).then(response => response.json());
};

export const getLeagueTransactions = (league_key, token) => {
  return fetch(
    `https://fantasysports.yahooapis.com/fantasy/v2/league/${league_key}/transactions?format=json`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then(response => response.json());
};

export const getTeam = (team_key, token) => {
  return fetch(
    `https://fantasysports.yahooapis.com/fantasy/v2/team/${team_key}/metadata?format=json`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then(response => response.json());
};

export const getTeamStanding = (team_key, token) => {
  return fetch(
    `https://fantasysports.yahooapis.com/fantasy/v2/team/${team_key}/standings?format=json`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then(response => response.json());
};

export const getTeamStats = (team_key, token, type, param) => {
  let url = `https://fantasysports.yahooapis.com/fantasy/v2/team/${team_key}/stats`;
  if (type === 'date') {
    url += `;type=date;date=${param}?format=json`;
  } else {
    url += `;type=week;week=${param}?format=json`;
  }
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json());
};

export const getLeague = (league_key, token) => {
  return fetch(
    `https://fantasysports.yahooapis.com/fantasy/v2/league/${league_key}/metadata?format=json`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then(response => response.json());
};
