import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    flexDirection: 'row',
  },
  headshotContainer: {
    marginTop: 5,
    height: 60,
    width: 60,
    borderRadius: 12,
    justifyContent: 'center',
    backgroundColor: '#eee',
    marginRight: 15,
    overflow: 'hidden',
  },
  headshot: {
    alignSelf: 'center',
    marginTop: 10,
    height: 55,
    width: 65,
  },
  headline: {
    flex: 1,
    color: theme.textPrimary,
    fontSize: 15,
  },
  status: {
    color: theme.textSecondary,
  },
  date: {
    marginTop: 3,
    color: theme.textTertiary,
  },
});
