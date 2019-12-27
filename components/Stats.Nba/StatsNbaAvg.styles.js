import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stat: {
    color: theme.textPrimary,
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    width: 150,
    textAlign: 'left',
    // paddingLeft: 10,
  },
});
