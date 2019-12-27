import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: theme.cardBackground,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
  },
  game: {
    paddingHorizontal: 10,
  },
  status: {
    flex: 1,
    color: theme.textSecondary,
    fontSize: 12,
  },
  broadcast: {
    color: theme.textSecondary,
    fontSize: 12,
  },
  teamContainer: {
    flex: 1,
  },
  awayTeam: {
    justifyContent: 'flex-end',
  },
  teamImage: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 65,
    width: 65,
  },
  teamName: {
    textAlign: 'center',
    color: theme.textPrimary,
  },
  teamRecord: {
    textAlign: 'center',
    fontSize: 12,
    color: theme.textTertiary,
  },
  score: {
    color: theme.textPrimary,
    fontSize: 24,
    paddingHorizontal: 10,
    // fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: -40,
    marginLeft: 10,
  },
  timeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startTime: {
    color: theme.textPrimary,
    fontSize: 22,
  },
  startTimeA: {
    color: theme.textPrimary,
    alignSelf: 'flex-end',
    fontSize: 12,
  },
  gameClock: {
    marginTop: -40,
    color: theme.textPrimary,
    fontSize: 13,
    textAlign: 'center',
  },
  date: {
    color: theme.textSecondary,
    textAlign: 'center',
    fontSize: 12,
  },
  nugget: {
    fontSize: 13,
    color: theme.textSecondary,
    flex: 1,
    paddingTop: 15,
    textAlign: 'center',
  },
});
