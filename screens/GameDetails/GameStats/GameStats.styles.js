import {StyleSheet} from 'react-native';
import * as theme from '../../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkBackground,
  },
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
  },
  scoreContainer: {
    marginTop: -10,
    marginHorizontal: -5,
    backgroundColor: theme.cardBackground,
    padding: 16,
    marginBottom: 3,
  },
  teamImage: {
    height: 70,
    width: 70,
  },
  teamInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamName: {
    color: theme.textPrimary,
    fontSize: 15,
  },
  teamNameSmall: {
    flex: 1,
    fontSize: 15,
    color: theme.textPrimary,
  },
  teamStanding: {
    color: theme.textSecondary,
  },
  teamScore: {
    color: theme.textPrimary,
    fontSize: 24,
  },
  scoreboard: {
    flex: 1.5,
    justifyContent: 'center',
    marginTop: 15,
  },
  gameClock: {
    color: theme.textPrimary,
    fontSize: 13,
    marginHorizontal: 20,
    marginTop: 7.5,
  },
  startTime: {
    color: theme.textPrimary,
    textAlign: 'center',
  },
  startTimeA: {
    color: theme.textPrimary,
    textAlign: 'center',
  },
  date: {
    color: theme.textPrimary,
    textAlign: 'center',
  },
  teamStatsContainer: {
    marginTop: 10,
  },
  teamQuarterName: {
    width: 100,
    color: theme.textPrimary,
    fontSize: 15,
    alignSelf: 'center',
  },
  teamQuarterImage: {
    width: 25,
    height: 25,
    marginRight: 10,
    alignSelf: 'center',
  },
  quarterHeader: {
    color: theme.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  quarterScores: {
    color: theme.textPrimary,
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
  },
  seriesSummary: {
    color: theme.textSecondary,
    textAlign: 'center',
    top: -40,
  },
});
