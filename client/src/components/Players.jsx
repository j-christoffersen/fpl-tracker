import React from 'react';
import PropTypes from 'prop-types';

import Selector from './Selector';

const Players = props => (
  <div>
    {props.players.map(player => (
      <Selector player={player} key={player.id} />
    ))}
  </div>
);

Players.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
};

export default Players;
