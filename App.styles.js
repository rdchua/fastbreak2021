import {StyleSheet} from 'react-native';
import * as theme from './Theme';

export const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  headerTitle: {
    flex: 1,
    color: theme.textPrimary,
    fontSize: 26,
  },
  headerSubTitle: {
    color: theme.textPrimary,
    flex: 1,
    textAlign: 'right',
    alignSelf: 'center',
    fontSize: 15,
  },
});
