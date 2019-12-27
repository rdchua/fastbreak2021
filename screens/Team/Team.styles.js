import {StyleSheet, Dimensions} from 'react-native';
import * as theme from '../../Theme';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkBackground,
  },
  contentContainer: {
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  toolbar: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginHorizontal: -10,
    backgroundColor: theme.cardBackground,
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 15,
    marginBottom: 5,
    overflow: 'hidden',
  },
  teamImage: {
    alignSelf: 'center',
    width: 85,
    height: 85,
    borderRadius: 50,
  },
  name: {
    color: theme.textPrimary,
    fontSize: 22,
  },
  info: {
    alignSelf: 'center',
    marginLeft: 5,
  },
  division: {
    color: theme.textSecondary,
    fontSize: 15,
  },
  buttons: {
    paddingLeft: 10,
    marginTop: 20,
  },
  rankContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rank: {
    color: theme.textPrimary,
    fontSize: 17,
  },
  rankName: {
    fontSize: 12,
    color: theme.textTertiary,
    letterSpacing: 1,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    padding: 20,
    height: screenHeight / 1.5,
    backgroundColor: theme.cardBackground,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalHeader: {
    fontSize: 24,
    color: 'white',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 22,
    color: 'white',
  },
});
