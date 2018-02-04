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
        <input onChange={this.onInputUpdate} />
        <button onClick={() => { this.props.onClick(this.state.text); }} > Add Player </button>
      </div>
    );
  }
}

Search.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Search;
