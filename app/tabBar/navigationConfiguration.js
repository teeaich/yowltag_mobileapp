import { TabNavigator } from 'react-navigation'
// Tab-Navigators
import TabLocationsNavigation from '../tabLocations/views/TabLocationsNavigation'
import TabMatchesNavigation from '../tabMatches/views/TabMatchesNavigation'


const routeConfiguration = {
  TabLocationsNavigation: { screen: TabLocationsNavigation },
  TabMatchesNavigation: { screen: TabMatchesNavigation }
};

const tabBarConfiguration = {
  //...other configs
  tabBarOptions:{
    // tint color is passed to text and icons (if enabled) on the tab bar
    activeTintColor: 'white',
    inactiveTintColor: 'blue',
// background color is for the tab component
    activeBackgroundColor: 'blue',
    inactiveBackgroundColor: 'white',
  }
};

export const TabBar = TabNavigator(routeConfiguration,tabBarConfiguration)

export const tabBarReducer = (state,action) => {
  if (action.type === 'JUMP_TO_TAB') {
    return { ...state, index:0 }
  } else {
    return TabBar.router.getStateForAction(action,state)
  }
}