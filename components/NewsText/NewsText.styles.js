import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  articleTitle: {
    color: theme.textPrimary,
    fontSize: 17,
    marginBottom: 10,
  },
  articleBody: {
    color: theme.textSecondary,
    fontSize: 15,
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
