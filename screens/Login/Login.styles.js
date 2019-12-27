import {StyleSheet, Dimensions} from 'react-native';
import * as theme from '../../Theme';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgColor,
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 20,
  },
  imageBg: {
    position: 'absolute',
    zIndex: -2,
    height: deviceHeight + 50,
    width: deviceWidth,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    position: 'absolute',
    zIndex: -1,
    height: deviceHeight + 50,
    width: deviceWidth,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  nbalogo: {
    position: 'absolute',
    height: 70,
    width: 140,
    top: '10%',
    left: deviceWidth / 2 - 70, //width / 2
  },
  title: {
    marginTop: '10%',
    fontSize: 30,
    color: 'white',
    paddingRight: 80,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 17,
    color: 'white',
  },
  pageTitleContainer: {
    marginLeft: -30,
  },
  button: {
    alignSelf: 'flex-start',
    marginTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#9b59b6',
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    alignSelf: 'center',
  },
});
