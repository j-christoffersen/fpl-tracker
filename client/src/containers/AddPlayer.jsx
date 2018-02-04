import { connect } from 'react-redux';

import Search from '../components/Search';
import { addPlayer } from '../actions';

const mapDispatchToProps = dispatch => (
  {
    onClick: (id) => {
      dispatch(addPlayer(id));
    },
  }
);

const AddPlayer = connect(null, mapDispatchToProps)(Search);

export default AddPlayer;
