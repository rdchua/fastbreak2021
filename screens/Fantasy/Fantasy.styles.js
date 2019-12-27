import {StyleSheet, Dimensions} from 'react-native';
import * as theme from '../../Theme';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 22,
    color: 'white',
  },
});
