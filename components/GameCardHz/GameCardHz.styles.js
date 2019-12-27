import {StyleSheet} from 'react-native';
import * as theme from './../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingRight: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a2a',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  header: {
    paddingVertical: 5,
  },
  gameClock: {
    color: theme.textSecondary,
    fontSize: 12,
    flex: 1,
  },
  broadcast: {
    color: theme.textTertiary,
    fontSize: 12,
    flex: 1,
    textAlign: 'right',
  },
  teamImage: {
    height: 50,
    width: 50,
  },
  teamInfo: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  teamName: {
    color: theme.textPrimary,
    fontSize: 15,
  },
  teamStanding: {
    color: theme.textTertiary,
    fontSize: 12,
  },
  score: {
    fontSize: 20,
    flex: 1,
    textAlign: 'right',
  },
  redCircle: {
    width: 7,
    height: 7,
    backgroundColor: 'red',
    borderRadius: 5,
    alignSelf: 'center',
    marginRight: 5,
    marginTop: 2,
  },
  nugget: {
    color: theme.textSecondary,
    fontSize: 13,
  },
});
