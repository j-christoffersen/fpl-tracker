const initialState = {
  players: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      if (state.players.map(player => player.id).indexOf(action.player.id) === -1) {
        return Object.assign({}, state, {
          players: [...state.players, action.player],
        });
      }
      return state;
    default:
      return state;
  }
};
