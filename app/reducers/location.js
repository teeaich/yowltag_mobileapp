const defaultState = {
  locationsData: []
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'ADD_LOCATION':
      return {
        ...state,
        locationsData: [action.payload, ...state.locationsData]
      };
    default:
      return state;
  }
}