import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 10,
    backgroundColor: theme.darkBackground,
  },
  contentContainer: {
    paddingBottom: 15,
  },
  headerContainer: {
    marginBottom: 5,
    padding: 16,
    elevation: 8,
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#151515',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    color: theme.textPrimary,
    fontSize: 26,
  },
  headerSubTitle: {
    color: theme.textPrimary,
    flex: 1,
    textAlign: 'right',
    alignSelf: 'center',
    fontSize: 17,
  },
  headerIcons: {
    flex: 1,
    textAlign: 'right',
    alignSelf: 'center',
  },
  appName: {
    fontSize: 20,
    flex: 1,
    color: theme.textPrimary,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
  refreshIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
});
