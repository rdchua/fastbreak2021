import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    backgroundColor: '#1F2022',
    width: 150,
    height: 155,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#2f2f2f',
  },
  gradient: {
    borderRadius: 9,
    position: 'relative',
    height: '100%',
    width: '100%',
    zIndex: 2,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: 14,
    lineHeight: 18,
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  content: {
    flex: 1,
  },
  image: {
    flex: 1.5,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  title: {
    fontSize: 17,
    color: theme.textPrimary,
  },
});
