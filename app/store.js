// Redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { createLogger } from 'redux-logger'

// Navigation
import { NavigatorTabLocations } from './tabLocations/navigationConfiguration'
import { NavigatorTabMatches } from './tabMatches/navigationConfiguration'
import { TabBar, tabBarReducer } from './tabBar/navigationConfiguration'

// other redcers
import { locationReducer, tagsReducer, backgroundGeolocationStateReducer } from './reducers/index';

const networkInterface = createNetworkInterface({
  uri: 'https://799gtq53sl.execute-api.us-east-1.amazonaws.com/dev/graphql'
});

const client = new ApolloClient({
  networkInterface
});
// Middleware
const middleware = () => {
  return applyMiddleware(createLogger())
};

export const store = createStore(
  combineReducers({
    tabBar: tabBarReducer,

    tabLocations: (state,action) => NavigatorTabLocations.router.getStateForAction(action,state),
    tabMatches: (state,action) => NavigatorTabMatches.router.getStateForAction(action,state),
    locations: locationReducer,
    tags: tagsReducer,
    backgroundGeolocationState: backgroundGeolocationStateReducer,
    apollo: client.reducer()
  }),
  middleware()
);

export const apolloClient = client;