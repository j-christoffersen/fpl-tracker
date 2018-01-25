import React from 'react';
import PropTypes from 'prop-types';

const Selector = props => (
  <div>
    <img
      className={`player-img player-img-${props.player.color}`}
      src={`https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/110x140/${props.player.photo}`}
      alt={props.player.name}
    />
    <p>{props.player.name}</p>
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
