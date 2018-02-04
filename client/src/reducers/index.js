const initialState = {
  players: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      return Object.assign({}, state, {
        players: [...state.players, action.player],
      });
    default:
      return state;
  }
};
