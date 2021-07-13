import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headlineContainer: {
    padding: 12,
    backgroundColor: '#000',
    // borderBottomWidth: 1,
    // borderBottomColor: theme.borderColor,
  },
  headline: {
    color: theme.textPrimary,
    fontSize: 28,
  },
  caption: {
    fontSize: 20,
    padding: 12,
    lineHeight: 30,
    color: theme.textPrimary,
  },
  description: {
    fontSize: 20,
    padding: 12,
    lineHeight: 30,
    color: theme.textPrimary,
  },
  infoContainer: {
    marginVertical: 10,
  },
  date: {
    color: theme.textTertiary,
  },
  injury: {
    fontSize: 15,
  },
  author: {
    color: theme.textPrimary,
  },
});
