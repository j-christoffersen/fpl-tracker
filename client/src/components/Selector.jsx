import React from 'react';
import PropTypes from 'prop-types';

const Selector = props => (
  <div className={`selector selector-${props.player.color}`}>
    <img
      className="player-img"
      src={`https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/110x140/${props.player.photo}`}
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
