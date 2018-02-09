import React from 'react';
import PropTypes from 'prop-types';

import Player from './Player';

const Players = props => (
  <div>
    {props.players.map(player => (
      <Player player={player} onClose={props.onClose} key={player.id} />
    ))}
  </div>
);

Players.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Players;
