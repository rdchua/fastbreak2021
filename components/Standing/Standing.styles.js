import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgColor,
  },
  contentConainer: {
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  tableHeader: {
    color: '#888',
    marginBottom: 8,
    fontSize: 12,
    letterSpacing: 1,
    textAlign: 'center',
  },
  tableData: {
    color: 'white',
    paddingVertical: 12,
    textAlign: 'center',
    fontFamily: 'SF-Pro-Display-Regular',
  },
  teamContainer: {
    textAlign: 'left',
    elevation: 8,
  },
  rank: {
    width: 20,
    marginRight: 5,
    color: 'gray',
  },
  teamLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 15,
    borderRadius: 20,
  },
  teamName: {
    flex: 1,
    paddingVertical: 12,
    color: 'white',
    textAlign: 'left',
  },
  shadow: {
    // marginLeft: -20,
    position: 'absolute',
    width: 20,
    left: 200,
    height: '110%',
    elevation: 3,
  },
  itemSeparator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#333',
  },
  teamNameContainer: {
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181818',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#333',
  },
  standingsStats: {
    flexDirection: 'row',
    backgroundColor: '#181818',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#333',
  },
});
