import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkBackground,
  },
  header: {
    paddingHorizontal: 20,
    flex: 1,
    elevation: 8,
    height: 60,
    flexDirection: 'row',
    backgroundColor: theme.cardBackground,
  },
  input: {
    flex: 1,
    fontSize: 22,
    color: 'white',
    fontFamily: 'SF-Pro-Display-Bold',
  },
  icon: {
    marginRight: 20,
    alignSelf: 'center',
  },
  teamContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  teamImage: {
    backgroundColor: '#ccc',
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  teamName: {
    fontSize: 17,
    color: 'white',
  },
  teamConf: {
    color: '#888',
  },
  playerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  playerInfo: {
    marginLeft: 15,
  },
  playerName: {
    fontSize: 17,
    color: 'white',
  },
  playerTeam: {
    color: '#888',
  },
  playerImage: {
    height: 40,
    width: 40,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  playerDetails: {
    fontSize: 12,
    color: '#888',
  },
});
