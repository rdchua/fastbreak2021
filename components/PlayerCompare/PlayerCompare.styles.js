import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  headshot: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  playerName: {
    fontSize: 15,
    color: theme.textPrimary,
  },
  playerValue: {
    color: theme.textPrimary,
    fontSize: 15,
  },
  leaderInfo: {
    marginLeft: 10,
  },
  label: {
    color: theme.textSecondary,
    fontSize: 12,
    letterSpacing: 0.5,
  },
});
