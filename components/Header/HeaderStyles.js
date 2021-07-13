import {StyleSheet, Dimensions} from 'react-native';
import * as theme from '../../Theme';
import {ThemeContext} from 'react-navigation';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 5,
    flexDirection: 'row',
    backgroundColor: theme.darkBackground,
    height: 60,
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
  },
  input: {
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    marginRight: 20,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#2f2f2f',
    backgroundColor: '#1F2022',
    borderRadius: 20,
    height: 39,
    flex: 2,
  },
  icon: {
    alignSelf: 'center',
  },
  logoFantasy: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    width: deviceWidth,
    height: deviceHeight / 1.5,
    backgroundColor: theme.cardBackground,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  teamContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
  },
  teamList: {
    maxHeight: 180,
  },
  header: {
    fontSize: 24,
    color: 'white',
    marginVertical: 5,
    marginBottom: 15,
  },
  teamImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  teamInfoContainer: {
    marginLeft: 10,
  },
  teamName: {
    fontSize: 17,
    color: 'white',
  },
  teamInfo: {
    color: '#888',
    fontSize: 12,
    marginRight: 5,
  },
  user: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  userIcon: {
    width: 30,
    height: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232426',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: theme.bgColor,
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 20,
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
  },
  button: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#9b59b6',
    borderRadius: 4,
    marginBottom: 15,
  },
  rateButton: {
    height: 45,
    width: deviceWidth - 50,
    backgroundColor: theme.accent,
    justifyContent: 'center',
    borderRadius: 4,
  },
  rateText: {
    color: theme.textPrimary,
    fontSize: 17,
    textAlign: 'center',
  },
  rateButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  product: {
    paddingBottom: 15,
  },
  productTitle: {
    fontSize: 17,
    color: theme.textPrimary,
  },
  productDescription: {
    color: theme.textTertiary,
  },
  productPrice: {
    color: theme.textPrimary,
    fontSize: 15,
    alignSelf: 'center',
  },
  info: {
    color: theme.textSecondary,
    marginTop: -15,
  },
});
