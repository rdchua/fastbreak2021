import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkBackground,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  teamImage: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
    alignSelf: 'center',
  },
  text: {
    color: theme.textPrimary,
    textAlignVertical: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  gameContainer: {
    padding: 8,
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  right: {
    flex: 1,
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 22,
    color: 'white',
  },
  nugget: {
    color: '#888',
    fontSize: 13,
    // fontStyle: 'italic',
    paddingLeft: 8,
    paddingTop: 5,
  },
});
