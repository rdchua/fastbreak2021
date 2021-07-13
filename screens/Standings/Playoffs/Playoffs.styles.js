import {StyleSheet} from 'react-native';
import * as theme from '../../../Theme';

export const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    backgroundColor: theme.darkBackground,
  },
  segment: {
    marginTop: 15,
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  roundContainer: {
    marginRight: 25,
  },
  roundHeader: {
    color: theme.textPrimary,
    textAlign: 'center',
    fontSize: 13,
  },
});
