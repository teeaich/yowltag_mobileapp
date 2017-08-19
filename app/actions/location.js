const defaultState = {
  locations: []
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'LOAD_LOCATIONS':
      return {
        ...state,
        locations: state.locations.concat(action.value)
      };

    default:
      return state;
  }
}