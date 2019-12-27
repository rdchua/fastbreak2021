import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    color: theme.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 0,
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    width: 150,
    textAlign: 'left',
    // paddingLeft: 10,
    letterSpacing: 1,
  },
});
