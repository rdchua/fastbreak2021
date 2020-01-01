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
    paddingHorizontal: 8,
  },
  heroImage: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
  },
  heroContainer: {
    marginTop: 10,
    marginHorizontal: -8,
    position: 'relative',
    height: 300,
    marginBottom: 10,
  },
  hero: {
    position: 'absolute',
    top: 10,
    width: screenWidth,
    height: 300,
  },
  heroTextContainer: {
    width: screenWidth,
    position: 'absolute',
    bottom: 40,
    left: 15,
    zIndex: 3,
    paddingRight: 100,
  },
  heroText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  heroTextSnip: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 12,
    letterSpacing: 1,
  },
  headlineContent: {
    paddingHorizontal: 0,
  },
  headlineContainer: {
    marginRight: 10,
  },
  headline: {
    marginTop: -40,
    marginBottom: 10,
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
  header: {
    fontSize: 24,
    color: 'white',
    marginVertical: 5,
  },
});
