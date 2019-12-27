import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  content: {
    paddingVertical: 10,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  scores: {
    width: '70%',
  },
  teamRow: {
    flexDirection: 'row',
  },
  teamImage: {
    height: 35,
    width: 35,
    marginRight: 10,
  },
  teamName: {
    flex: 1,
    fontSize: 15,
    alignSelf: 'center',
  },
  teamScoreWinner: {
    width: 40,
    paddingVertical: 5,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: '#3f3f3f',
  },
  teamScoreLoser: {
    width: 40,
    paddingVertical: 5,
    color: 'gray',
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: '#3f3f3f',
  },
  gameInfo: {
    flex: 1,
    flexDirection: 'row',
  },
  gameDetails: {
    flexDirection: 'row',
  },
  gameClock: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    flex: 1,
    flexWrap: 'wrap',
  },
  gameClockValue: {
    paddingLeft: 5,
  },
  gameStream: {
    flex: 1,
    paddingHorizontal: 5,
  },
  gameStreamValue: {
    paddingLeft: 8,
    color: '#888',
  },
  gameActions: {
    flex: 1,
    justifyContent: 'center',
  },
  gameAlert: {
    alignSelf: 'flex-end',
    paddingRight: 8,
  },
  nugget: {
    color: '#888',
    fontSize: 13,
    // fontStyle: 'italic',
    paddingLeft: 8,
    paddingTop: 5,
  },
  caret: {
    alignSelf: 'center',
    paddingRight: 10,
  },
  roundedCornerTop: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  roundedCornerBottom: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  collapsibleView: {
    marginVertical: 20,
    paddingHorizontal: 8,
    // justifyContent: 'center'
  },
  leaderContainer: {
    marginVertical: 5,
    borderColor: 'white',
    flexDirection: 'row',
  },
  hPlayerLeader: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
  },
  vPlayerLeader: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
  },
  statName: {
    color: '#888',
    fontSize: 12,
    alignSelf: 'center',
    // fontWeight: 'bold',
    marginHorizontal: 20,
    flex: 1,
    textAlign: 'center',
  },
  hTeamLeaderVal: {
    flex: 1,
    textAlign: 'center',
    // fontWeight: 'bold',
    color: 'white',
  },
  vTeamLeaderVal: {
    flex: 1,
    textAlign: 'center',
    // fontWeight: 'bold',
    color: 'white',
  },
  standing: {
    color: theme.textTertiary,
    fontSize: 13,
  },
  live: {
    paddingLeft: 5,
    color: theme.red,
  },
  notifIcon: {
    justifyContent: 'center',
  },
});
