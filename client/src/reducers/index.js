const initialState = {
  loading: true,
  playerList: [],
  players: [],
  stat: 'goalsScored',
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
    case 'SET_STAT':
      if (state.players.indexOf(action.statName) === -1) {
        return Object.assign({}, state, {
          stat: action.statName,
        });
      }
      return state;
    case 'SET_PLAYER_LIST':
      return Object.assign({}, state, {
        loading: false,
        playerList: action.players,
      });
    default:
      return state;
  }
};
