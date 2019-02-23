export default function reducer(state, action){
    switch (action.type) {
    case 'ADD_BUTTON':
        return {
            ...state,
            buttons: {
                ...state.meta,
                buttons: action.payload.button,
            },
        };

    default:
      return state;
  }
};