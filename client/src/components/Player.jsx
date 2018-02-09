import React from 'react';
import PropTypes from 'prop-types';

const Selector = props => (
  <div className={`selector selector-${props.player.color}`}>
    <button onClick={() => props.onClose(props.player.id)} >Close</button>
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Selector;
