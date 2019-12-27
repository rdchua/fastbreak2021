import {StyleSheet, Dimensions} from 'react-native';
import * as theme from '../../Theme';

const deviceHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    height: deviceHeight / 2,
    backgroundColor: theme.cardBgColor,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
