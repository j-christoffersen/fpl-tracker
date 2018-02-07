import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = props => (
  <select onChange={e => props.onChange(e.target.value)}>
    {props.items.map(item => (
      <option value={item.name} key={item.id}>{item.name}</option>
    ))}
  </select>
);

Dropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};

export default Dropdown;
