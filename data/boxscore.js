import DeviceInfo from 'react-native-device-info';
const fontScale = DeviceInfo.getFontScaleSync();
const MIN_WIDTH = {width: 45 * fontScale};
const NORMAL_WIDTH = {width: 43 * fontScale};
const PERCENT_WIDTH = {width: 50 * fontScale};

export const boxscoreStats = [
  {
    name: 'MIN',
    sortKey: 'min',
    width: MIN_WIDTH,
  },
  {
    name: 'PTS',
    sortKey: 'points',
    width: NORMAL_WIDTH,
  },
  {
    name: 'REB',
    sortKey: 'totReb',
    width: NORMAL_WIDTH,
  },
  {
    name: 'AST',
    sortKey: 'assists',
    width: NORMAL_WIDTH,
  },
  {
    name: 'STL',
    sortKey: 'steals',
    width: NORMAL_WIDTH,
  },
  {
    name: 'BLK',
    sortKey: 'blocks',
    width: NORMAL_WIDTH,
  },
  {
    name: 'FG',
    sortKey: 'fgm',
    width: PERCENT_WIDTH,
  },
  {
    name: 'FG%',
    sortKey: 'fgp',
    width: PERCENT_WIDTH,
  },
  {
    name: '3P',
    sortKey: 'tpm',
    width: PERCENT_WIDTH,
  },
  {
    name: '3P%',
    sortKey: 'tpp',
    width: PERCENT_WIDTH,
  },
  {
    name: 'FT',
    sortKey: 'ftm',
    width: PERCENT_WIDTH,
  },
  {
    name: 'FT%',
    sortKey: 'ftp',
    width: PERCENT_WIDTH,
  },
  {
    name: 'OREB',
    sortKey: 'offReb',
    width: PERCENT_WIDTH,
  },
  {
    name: 'DREB',
    sortKey: 'defReb',
    width: PERCENT_WIDTH,
  },
  {
    name: 'TO',
    sortKey: 'turnovers',
    width: NORMAL_WIDTH,
  },
  {
    name: '+/-',
    sortKey: 'plusMinus',
    width: NORMAL_WIDTH,
  },
];
