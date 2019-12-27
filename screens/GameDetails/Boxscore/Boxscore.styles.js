import {StyleSheet} from 'react-native';
import * as theme from '../../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: theme.darkBackground,
  },
  contentMain: {
    paddingBottom: 20,
  },
  contentContainer: {
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    // flexDirection: 'row',
    marginVertical: 10,
  },
  tableHeader: {
    textAlign: 'center',
    fontSize: 12,
  },
  playerContainer: {
    paddingLeft: 10,
    paddingVertical: 5,
    width: 175,
    alignItems: 'center',
  },
  playerName: {
    color: theme.textPrimary,
  },
  playerStat: {
    color: theme.textPrimary,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 15,
    textAlignVertical: 'center',
    height: 50, //headshot height + paddingTop + paddingBottom
  },
  headshot: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  segment: {
    marginTop: 15,
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  headerName: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: -6,
    alignSelf: 'center',
  },
});
