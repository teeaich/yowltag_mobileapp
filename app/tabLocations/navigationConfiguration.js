import { StackNavigator } from 'react-navigation';

// Screens
import TabLocationsHomescreen from './views/TabLocationsHomescreen';
import TabLocationsSettings from './views/TabLocationsSettings';

const routeConfiguration = {
  TabLocationsHomescreen: { screen: TabLocationsHomescreen },
  TabLocationsSettings: { screen: TabLocationsSettings },
};

// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'TabLocationsHomescreen'
};

export const NavigatorTabLocations = StackNavigator(routeConfiguration,stackNavigatorConfiguration)