const initialState = {
  loading: true,
  playerList: [],
  players: [],
  stat: 'minutes',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PLAYER': {
      if (state.players.map(player => player.id).indexOf(action.player.id) === -1) {
        return Object.assign({}, state, {
          players: [...state.players, action.player],
        });
      }
      return state;
    }

    case 'REMOVE_PLAYER': {
      return Object.assign({}, state, {
        players: state.players
          .slice()
          .filter(player => player.id !== action.id),
      });
    }

    case 'SET_STAT': {
      if (state.players.indexOf(action.statName) === -1) {
        return Object.assign({}, state, {
          stat: action.statName,
        });
      }
      return state;
    }

    case 'SET_PLAYER_LIST': {
      return Object.assign({}, state, {
        loading: false,
        playerList: action.players,
      });
    }

    case 'UPDATE_PLAYERS': {
      const players = state.players.slice();
      players.forEach(player => (
        Object.assign(player, action.players.find(e => e.id === player.id))
      ));

      return Object.assign({}, state, {
        players,
      });
    }

    default: {
      return state;
    }
  }
};
