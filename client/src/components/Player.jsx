import React from 'react';
import PropTypes from 'prop-types';

const Selector = props => (
  <div className={`selector selector-${props.player.color}`}>
    <img
      className="player-img"
      src={props.player.photoUrl}
      alt={props.player.name}
    />
    <div className="player-title">{props.player.name}</div>
  </div>
);

Selector.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

export default Selector;
