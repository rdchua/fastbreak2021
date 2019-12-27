import {StyleSheet, Dimensions} from 'react-native';
import * as theme from '../../../Theme';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkBackground,
  },
  contentContainerStyle: {
    paddingBottom: 15,
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  managerContainer: {
    paddingHorizontal: 12,
    paddingBottom: 10,
    paddingTop: 24,
  },
  teamLogo: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
    alignSelf: 'center',
  },
  teamName: {
    color: theme.textPrimary,
    fontSize: 17,
  },
  teamStanding: {
    color: theme.textSecondary,
    fontSize: 13,
  },
  teamStatContainer: {
    paddingRight: 20,
  },
  teamStatName: {
    letterSpacing: 0.5,
    color: theme.textSecondary,
    fontSize: 12,
    textAlign: 'center',
  },
  teamStatValue: {
    color: theme.textPrimary,
    textAlign: 'center',
  },
  teamStatContentContainer: {
    padding: 12,
    backgroundColor: theme.cardBackground,
  },
  listHeader: {
    color: theme.textTertiary,
    letterSpacing: 0.5,
    fontSize: 12,
    padding: 12,
    paddingBottom: 8,
  },
  tableHeader: {
    textAlign: 'center',
    color: theme.textSecondary,
    fontSize: 12,
  },
  playerContainer: {
    paddingLeft: 10,
    paddingVertical: 6,
    width: 200,
    alignItems: 'center',
  },
  playerName: {
    color: theme.textPrimary,
  },
  playerTeam: {
    color: theme.textSecondary,
    fontSize: 12,
  },
  playerStat: {
    color: theme.textPrimary,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 15,
    textAlignVertical: 'center',
    height: 52, //headshot height + paddingTop + paddingBottom (or paddingVertical / 2)
  },
  headshot: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  date: {
    color: theme.textPrimary,
    paddingHorizontal: 17.5,
  },
  dateContainer: {
    flex: 1,
    paddingLeft: 12,
    paddingVertical: 5,
  },
  iconContainer: {
    paddingHorizontal: 5,
    alignSelf: 'center',
  },
  status: {
    color: theme.red,
    fontSize: 12,
  },
  loadingContainer: {
    height: 59,
    backgroundColor: theme.cardBackground,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.cardBackground,
  },
  textInput: {
    flex: 1,
    height: 60,
    color: 'white',
    paddingLeft: 10,
    fontSize: 15,
  },
  searchingIndicator: {
    marginHorizontal: 15,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    width: deviceWidth,
    height: deviceHeight / 1.75,
    backgroundColor: theme.cardBackground,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalTitle: {
    fontSize: 24,
    color: 'white',
    marginVertical: 5,
    marginBottom: 15,
  },
  modalOption: {
    flex: 1,
    paddingRight: 5,
    alignSelf: 'center',
  },
  modalOptionText: {
    marginTop: -3,
    fontSize: 12,
    color: theme.textTertiary,
    letterSpacing: 0.5,
    textAlign: 'right',
    textAlignVertical: 'center',
  },
});
