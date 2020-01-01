import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  headshot: {
    height: 45,
    width: 45,
    borderRadius: 25,
    alignSelf: 'center',
    marginRight: 15,
  },
  playerName: {
    color: theme.textPrimary,
    fontSize: 17,
  },
  playerInfo: {
    color: theme.textSecondary,
    fontSize: 13,
  },
  stat: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    color: theme.textPrimary,
    textAlign: 'right',
  },
  statName: {
    fontSize: 12,
    letterSpacing: 1,
    color: theme.textTertiary,
    textAlign: 'right',
  },
  subinfo: {
    color: theme.textSecondary,
    fontSize: 13,
  },
});
