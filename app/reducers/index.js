import { combineReducers } from 'redux';
import locationReducer from './location';
import tagsReducer from './tags';
import backgroundGeolocationStateReducer from './backgroundGeoloation';

export {
  locationReducer,
  tagsReducer,
  backgroundGeolocationStateReducer
};