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
        <input list="items" onChange={this.onInputUpdate} />
        <datalist id="items">
          {
            this.props.items.map(item => (
              <option value={item.name} key={item.id} />
            ))
          }
        </datalist>
        <button onClick={() => { this.props.onClick(this.state.text); }} >
          {this.props.buttonString}
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  onClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  buttonString: PropTypes.string.isRequired,
};

export default Search;
