import {Dimensions} from 'react-native';
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const secondary = '#3E5D9B';
export const tertiary = '#C8102E';
export const red = '#E61C39';

// Light Theme
export const lightPrimary = '#0B153C';
export const lightBackground = '#FFFFF';

//Dark Theme
export const darkPrimary = '#121314';
export const darkBackground = '#121314';
export const accent = '#1988F4';

//Font styles
export const caption2 = 11;
export const caption1 = 12;
export const footnote = 13;
export const subhead = 15;
export const callout = 16;
export const body = 17;
export const headline = 17;
export const title3 = 20;
export const title2 = 22;
export const title1 = 28;
export const title = 34;
export const textPrimary = '#F2F2F2';
export const textSecondary = '#ABABAB';
export const textTertiary = '#737373';
export const textHint = '#404040';
export const skeleton = '#2a2a2a';
export const skeletonHighlight = '#222';

//Card
export const cardBackground = '#1e1f21';

export const tabBarTextStyle = {
  fontSize: 12,
  letterSpacing: 0.7,
  marginTop: 10,
};
export const tabBarUnderlineStyle = {
  backgroundColor: '#1988F4',
  height: 2,
  borderRadius: 9,
};
//Font weights
// light
// regular
// medium
// bold
export const fantasyPrimary = '#34495e';
export const fantasySecondary = '#2c3e50';
export const fantasyTabBarTextStyle = {
  fontSize: 12,
  letterSpacing: 0.7,
};
export const fantasyTabBarUnderlineStyle = {
  backgroundColor: '#fff',
  height: 2,
  borderRadius: 9,
};
//skeleton layouts

export const skeletonStyle = {
  flex: 1,
  // alignItems: 'flex-start',
  width: '100%',
};
export const newsTextSkeleton = [
  {width: screenWidth - 50, height: 20, marginBottom: 20},
  {width: screenWidth - 50, height: 20, marginBottom: 10},
  {width: screenWidth - 200, height: 20, marginBottom: 10},
];

export const skeletonLeadersStyle = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  paddingVertical: 10,
};
export const leadersSkeleton = [
  {width: 45, height: 45, borderRadius: 25},
  {width: screenWidth - 100, height: 20, marginLeft: 15},
];

export const skeletonTeamStatsStyle = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 35,
  paddingVertical: 3,
};
export const teamStatsSkeleton = [
  {
    width: screenWidth / 3.33,
    height: 20,
    marginBottom: 25,
    flex: 1,
    marginRight: 10,
  },
  {
    width: screenWidth / 3.33,
    height: 20,
    marginBottom: 25,
    flex: 1,
    marginHorizontal: 10,
  },
  {
    width: screenWidth / 3.33,
    height: 20,
    marginBottom: 25,
    flex: 1,
    marginLeft: 10,
  },
];

export const skeletonTeamRankStyle = {
  flex: 1,
  paddingLeft: 12,
  alignItems: 'flex-start',
  marginVertical: 9.5,
};
export const teamRankSkeleton = [{width: screenWidth - 50, height: 20}];

export const skeletonTeamNewsStyle = {
  flex: 1,
  alignItems: 'flex-start',
};

export const teamNewsSkeleton = [
  {width: screenWidth, height: 215, marginBottom: 15},
  {width: screenWidth - 50, height: 20, marginBottom: 15, paddingLeft: 12},
  {width: screenWidth - 120, height: 20, paddingLeft: 12},
];

export const skeletonLogsStyle = {
  flex: 1,
  alignItems: 'flex-start',
  marginBottom: 10,
};

export const playerLogsSkeleton = [
  {width: screenWidth - 50, height: 20, marginBottom: 10},
  {width: screenWidth - 50, height: 20, marginBottom: 10},
  {width: screenWidth - 50, height: 20, marginBottom: 0},
];

export const newsHeroStyle = {
  flex: 1,
  height: 300,
};
export const newsHeroLayout = [{width: screenWidth, height: 450}];

export const headlineStyle = {
  flex: 1,
  height: 165.142,
  width: screenWidth - 16,
  flexDirection: 'row',
  marginTop: -40,
  marginBottom: 10,
};
export const headlineLayout = [
  {width: 155, height: 150, marginRight: 10, elevation: 8},
  {width: 155, height: 150, marginRight: 10, elevation: 8},
  {width: 155, height: 150, marginRight: 10, elevation: 8},
];

export const rotowireStyle = {
  flexDirection: 'row',
  paddingVertical: 15,
};
export const rotowireLayout = [
  {width: 65, height: 55, marginRight: 15},
  {flex: 1, height: 120},
];

export const otherNewsStyle = {
  flexDirection: 'row',
  paddingVertical: 15,
};
export const otherNewsLayout = [
  {flex: 1, height: 65, paddingRight: 20, marginRight: 20},
  {width: 60, height: 60},
];

export const videosStyle = {
  flexDirection: 'row',
  paddingVertical: 15,
};
export const videosLayout = [
  {height: 90, width: 160, marginRight: 15},
  {flex: 1, height: 80},
];

export const preGameStyle = {
  flexDirection: 'row',
  paddingVertical: 8,
};
export const preGameLeadersLayout = [
  {width: 40, height: 40, borderRadius: 20, marginRight: 10},
  {flex: 1, height: 20, alignSelf: 'center'},
];
