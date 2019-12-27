import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkBackground,
  },
  teamList: {
    paddingLeft: 15,
    height: 70,
  },
  teamContainer: {
    borderWidth: 2,
    // borderColor: '#333',
    borderRadius: 50,
    height: 60,
    width: 60,
    marginRight: 10,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  teamImage: {
    height: 60,
    width: 60,
    alignSelf: 'center',
  },
  eventContainer: {
    width: '95%',
    paddingVertical: 2,
  },
});
