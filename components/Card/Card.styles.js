import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.cardBackground,
    marginVertical: 5,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2B2C2E',
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    // fontWeight: 'bold',
    color: theme.textPrimary,
    textTransform: 'uppercase',
  },
  subtitle: {
    flex: 1,
    // fontWeight: 'bold',
    color: 'gray',
    fontSize: 12,
    alignSelf: 'center',
    textTransform: 'uppercase',
    textAlign: 'right',
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#333',
    paddingBottom: 12,
  },
});
