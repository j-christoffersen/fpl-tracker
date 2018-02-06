const initialState = {
  loading: true,
  playerList: [],
  players: [],
  stats: [],
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
    case 'ADD_STAT':
      if (state.players.indexOf(action.statName) === -1) {
        return Object.assign({}, state, {
          stats: [...state.stats, action.statName],
        });
      }
      return state;
    case 'SET_PLAYER_LIST':
      console.log('hello');
      return Object.assign({}, state, {
        loading: false,
        playerList: action.players,
      });
    default:
      return state;
  }
};
