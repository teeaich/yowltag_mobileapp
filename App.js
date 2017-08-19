// React
import React from 'react'
import { AppRegistry, StatusBar} from 'react-native'
// Redux
import { Provider } from 'react-redux'
import { apolloClient, store} from './app/store'
// Apollo
import { ApolloProvider } from 'react-apollo';
// Navigation
import TabBarNavigation from './app/tabBar/views/TabBarNavigation'
export default class YowltagApp extends React.Component {
  render(){
    return(
      <ApolloProvider store={store} client={apolloClient}>
          <TabBarNavigation>
            <StatusBar hidden/>
          </TabBarNavigation>
      </ApolloProvider>
    )
  }
}
