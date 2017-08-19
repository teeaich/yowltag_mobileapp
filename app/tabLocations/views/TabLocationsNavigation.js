// React
import React from 'react'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { NavigatorTabLocations } from '../navigationConfiguration'

// Redux
import { connect } from 'react-redux'

// Icon
import Icon from 'react-native-vector-icons/FontAwesome'


const mapStateToProps = (state) => {
  return {
    navigationState: state.tabLocations
  }
}

class TabLocationsNavigation extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Locations',
    tabBarIcon: ({ tintColor }) => <Icon size={ 20 } name={ 'cogs' } color={ tintColor }/>
  }

  render(){
    const { navigationState, dispatch } = this.props
    return (
      <NavigatorTabLocations
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState
          })
        }
      />
    )
  }
}
export default connect(mapStateToProps)(TabLocationsNavigation)