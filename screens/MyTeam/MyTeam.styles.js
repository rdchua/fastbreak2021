import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkBackground,
  },
  contentContainer: {
    paddingHorizontal: 8,
    marginTop: 5,
  },
  cardTitle: {
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 10,
  },
  button: {
    marginRight: 10,
  },
  info: {
    color: theme.textSecondary,
    fontSize: 14,
    marginTop: 5,
  },
});
