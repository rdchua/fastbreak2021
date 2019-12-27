import {StyleSheet} from 'react-native';
import * as theme from '../../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkBackground,
  },
  contentContainer: {
    paddingBottom: 15,
    paddingHorizontal: 5,
  },
  teamLogo: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
  },
  score: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
  },
  stat: {
    fontSize: 12,
    height: 20,
    color: '#888',
    paddingHorizontal: 10,
  },
  scoreTitle: {
    color: '#888',
    height: 20,
    fontSize: 12,
  },
  teamNameContainer: {
    backgroundColor: theme.cardBackground,
    marginBottom: 5,
    marginHorizontal: -5,
    padding: 12,
    flex: 1,
  },
  teamNameContainer2: {
    height: 40,
    marginBottom: 15,
  },
  manager: {
    color: theme.textSecondary,
  },
  scoreContainer: {
    marginHorizontal: -5,
    backgroundColor: theme.cardBackground,
    elevation: 6,
    padding: 16,
    marginBottom: 5,
  },
  teamImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
    marginBottom: 5,
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
    alignSelf: 'center',
  },
  scoreboard: {
    flex: 1.5,
    justifyContent: 'center',
    marginTop: 15,
  },
  gameClock: {
    alignSelf: 'center',
    color: theme.textPrimary,
    marginHorizontal: '15%',
    marginTop: 7.5,
  },
  sectionTitle: {
    fontSize: 12,
    color: theme.textTertiary,
    letterSpacing: 0.5,
    marginTop: 15,
    marginBottom: 10,
    paddingLeft: 8,
  },
  teamStats: {
    backgroundColor: theme.cardBackground,
  },
  weekText: {
    color: theme.textPrimary,
    marginHorizontal: 25,
  },
});
