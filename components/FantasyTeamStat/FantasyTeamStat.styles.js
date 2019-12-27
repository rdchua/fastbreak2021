import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  teamStatsContainer: {
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  statValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamStatHome: {
    color: '#fff',
    fontSize: 15,
  },
  teamStatVisitor: {
    fontSize: 15,
    color: '#fff',
  },
  teamStatName: {
    color: theme.textSecondary,
    fontSize: 13,
  },
});
