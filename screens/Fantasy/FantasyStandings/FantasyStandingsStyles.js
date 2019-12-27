import {StyleSheet} from 'react-native';
import * as theme from '../../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkBackground,
    paddingTop: 15,
  },
  row: {
    flexDirection: 'row',
  },
  teamLogo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
  },
  teamName: {
    color: 'white',
    width: 200,
    marginLeft: 10,
    textAlignVertical: 'center',
  },
  teamStanding: {
    color: 'white',
    width: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  percentage: {
    color: 'white',
    width: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  header: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  rank: {
    width: 20,
    paddingLeft: 5,
    color: theme.textTertiary,
    textAlignVertical: 'center',
  },
});
