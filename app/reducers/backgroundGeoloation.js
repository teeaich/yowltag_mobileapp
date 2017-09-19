import BackgroundGeolocation from 'react-native-background-geolocation';

const defaultState = {
  // Location record
  recordEnabled: false,
  recordName: false,
  recordId: false,
  // Geolocation Config
  desiredAccuracy: 0,
  distanceFilter: 10,
  stationaryRadius: 25,
  desiredOdometerAccuracy: 100,
  // Activity Recognition
  stopTimeout: 1,
  // Application config
  stopOnStationary: false,
  debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
  logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
  stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
  startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'ADD_BG_STATE':
      return {
        ...state,
        ...action.payload
      };
    case 'START_RECORDDATA':
      const { name, id } = action.payload;
      return {
        ...state,
        recordEnabled: true,
        recordName: name,
        recordId: id
      };
    case 'STOP_RECORDDATA':
      return {
        ...state,
        recordEnabled: false,
        recordName: false,
        recordId: false
      };
    default:
      return state;
  }
}