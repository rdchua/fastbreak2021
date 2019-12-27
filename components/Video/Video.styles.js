import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgColor,
  },
  row: {
    flexDirection: 'row',
  },
  videoContainer: {
    height: 110,
  },
  thumbnail: {
    height: '100%',
    width: 150,
  },
  videoInfo: {
    padding: 12,
    flex: 1,
  },
  videoTitle: {
    color: theme.textPrimary,
    fontSize: 15,
    flex: 1,
  },
  videoChannel: {
    color: theme.textSecondary,
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontSize: 13,
  },
  playIcon: {
    alignSelf: 'center',
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 3,
    height: 110,
    width: 150,
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    zIndex: 2,
    height: 110,
    width: 150,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
