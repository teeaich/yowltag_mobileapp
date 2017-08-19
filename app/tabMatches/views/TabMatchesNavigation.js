// React
import React from 'react'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { NavigatorTabMatches } from '../navigationConfiguration'

// Redux
import { connect } from 'react-redux'

// Icon
import Icon from 'react-native-vector-icons/FontAwesome'


const mapStateToProps = (state) => {
  return {
    navigationState: state.tabMatches
  }
};

class TabMatchesNavigation extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Matches',
    tabBarIcon: ({ tintColor }) => <Icon size={ 20 } name={ 'cogs' } color={ tintColor }/>
  };

  render(){
    const { navigationState, dispatch } = this.props;
    return (
      <NavigatorTabMatches
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
export default connect(mapStateToProps)(TabMatchesNavigation)