import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      text: '',
    };

    this.onInputUpdate = this.onInputUpdate.bind(this);
  }

  onInputUpdate(e) {
    this.setState({
      text: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <input list="players" onChange={this.onInputUpdate} />
        <datalist id="players">
          {
            this.props.players.map(player => (
              <option value={player.name} key={player.id} />
            ))
          }
        </datalist>
        <button onClick={() => { this.props.onClick(this.state.text); }} > Add Player </button>
      </div>
    );
  }
}

Search.propTypes = {
  onClick: PropTypes.func.isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};

export default Search;
