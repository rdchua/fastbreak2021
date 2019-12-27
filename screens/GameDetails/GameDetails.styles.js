import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 26,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  clock: {
    color: theme.textPrimary,
    fontSize: 17,
  },
});
