import {Dimensions, StyleSheet} from 'react-native';
import * as theme from '../../Theme';
const deviceHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkBackground,
  },
  contentContainer: {
    paddingHorizontal: 5,
  },
  empty: {
    textAlign: 'center',
    fontSize: 15,
    color: theme.textPrimary,
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    marginHorizontal: -5,
    backgroundColor: theme.cardBackground,
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 20,
    marginBottom: 5,
    overflow: 'hidden',
  },
  headshot: {
    alignSelf: 'center',
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  name: {
    color: theme.textPrimary,
    fontSize: 22,
  },
  info: {
    alignSelf: 'center',
    marginLeft: 15,
  },
  teamName: {
    color: theme.textPrimary,
    fontSize: 15,
  },
  teamImage: {
    position: 'absolute',
    width: 250,
    height: 250,
    opacity: 0.1,
    right: -120,
    bottom: -150,
  },
  number: {
    color: theme.textSecondary,
    fontSize: 12,
  },
  profile: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#333',
  },
  profileName: {
    color: theme.textPrimary,
    flex: 1,
    textAlign: 'left',
    fontSize: 15,
  },
  profileValue: {
    color: theme.textSecondary,
    fontSize: 15,
  },
  buttons: {
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
    paddingHorizontal: 20,
    paddingVertical: 5,
    height: deviceHeight / 2,
    backgroundColor: theme.cardBackground,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalHeader: {
    fontSize: 24,
    color: 'white',
    marginTop: 5,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 22,
    color: 'white',
  },
});
