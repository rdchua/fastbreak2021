import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
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
    height: '100%',
    textAlignVertical: 'center',
  },
  clockContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: '100%',
  },
  headerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
  },
  teamImage: {
    width: 35,
    height: 35,
    marginHorizontal: 10,
  },
});
