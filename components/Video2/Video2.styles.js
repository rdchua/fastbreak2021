import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  thumbnail: {
    height: 90,
    width: 160,
    marginRight: 15,
  },
  title: {
    color: 'white',
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
});
