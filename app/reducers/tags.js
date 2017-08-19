const defaultState = {
  tagsData: []
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'LOAD_TAGS':
      return {
        ...state,
        tagsData: [action.payload]
      };
    default:
      return state;
  }
}