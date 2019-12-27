import {StyleSheet} from 'react-native';
import * as theme from '../../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkBackground,
    paddingTop: 10,
  },
  header: {
    color: theme.textPrimary,
    fontSize: 17,
    marginBottom: 10,
    marginLeft: 10,
  },
  segment: {
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  play: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#181818',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#333',
  },
  row: {
    flexDirection: 'row',
  },
  clock: {
    color: theme.textPrimary,
    width: 60,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  teamImage: {
    height: 30,
    width: 30,
    marginHorizontal: 10,
  },
  description: {
    flex: 1,
    color: theme.textPrimary,
    textAlignVertical: 'center',
    paddingRight: 10,
  },
});
