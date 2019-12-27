import {StyleSheet} from 'react-native';
import * as theme from '../../../Theme';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  buttonText: {
    alignSelf: 'center',
    color: theme.textPrimary,
    fontSize: 15,
  },
});
