import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingVertical: 15,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
  title2: {
    flex: 1,
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 12,
    alignSelf: 'center',
    textTransform: 'uppercase',
    textAlign: 'right',
  },
  headline: {
    flex: 1,
  },
  headlineValue: {
    paddingRight: 10,
    lineHeight: 22,
    fontSize: 15,
    color: 'white',
  },
  newsImage: {
    height: 60,
    width: 60,
    borderRadius: 9,
    marginHorizontal: 15,
  },
  image: {
    borderRadius: 9,
    height: '100%',
    width: '100%',
  },
  author: {
    fontSize: 12,
    color: 'white',
  },
});
