import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    height: 215,
    width: '100%',
  },
  title: {
    padding: 12,
    color: theme.textPrimary,
    fontSize: 17,
  },
  info: {
    marginTop: -15,
    padding: 12,
  },
  author: {
    color: theme.textPrimary,
    fontSize: 12,
  },
  time: {
    color: theme.textTertiary,
    fontSize: 12,
  },
});
