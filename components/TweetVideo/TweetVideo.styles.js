import {StyleSheet} from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.cardBackground,
    borderRadius: 4,
    marginVertical: 5,
    padding: 12,
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    paddingVertical: 10,
    fontSize: 15,
    lineHeight: 20,
    color: theme.textPrimary,
  },
  userContainer: {
    flexDirection: 'row',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 15,
  },
  userHandle: {
    color: theme.textPrimary,
  },
  userName: {
    color: theme.textSecondary,
    fontSize: 12,
  },
  createdAt: {
    color: theme.textTertiary,
  },
  actionContainer: {
    flex: 1,
    paddingVertical: 2.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  count: {
    color: theme.textTertiary,
    fontSize: 14,
  },
  icon: {
    marginHorizontal: 8,
    alignSelf: 'center',
  },
  video: {
    marginBottom: 10,
    backgroundColor: 'black',
  },
  videoContainer: {
    flex: 1,
    marginHorizontal: -12,
  },
  link: {
    color: theme.accent,
  },
});
