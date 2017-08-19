import { StackNavigator } from 'react-navigation'

// Screens
import TabMatchesHomescreen from './views/TabMatchesHomescreen'
import TabMatchesHashsDetail from './views/TabMatchesHashsDetail'

const routeConfiguration = {
  TabMatchesHomescreen: { screen: TabMatchesHomescreen },
  TabMatchesHashsDetail: { screen : TabMatchesHashsDetail }
};

// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'TabMatchesHomescreen'
};

export const NavigatorTabMatches = StackNavigator(routeConfiguration,stackNavigatorConfiguration)