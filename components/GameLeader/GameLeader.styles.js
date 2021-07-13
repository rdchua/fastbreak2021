import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  headshot: {
    height: 45,
    width: 45,
    borderRadius: 25,
    alignSelf: 'center',
  },
  stats: {
    marginLeft: 15,
    flex: 1,
  },
  statName: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  statVal: {
    fontSize: 17,
    color: theme.textPrimary,
  },
  playerName: {
    fontSize: 17,
    color: theme.textPrimary,
  },
  teamcode: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  teamImage: {
    width: 25,
    height: 25,
  },
  details: {
    flexDirection: 'row',
  },
  jersey: {
    color: theme.textPrimary,
    fontSize: 12,
    textAlign: 'center',
  },
  teamContainer: {
    alignSelf: 'center',
    marginRight: 5,
  },
  statsContentContainer: {
    borderWidth: 3,
    borderColor: 'red',
  },
});
