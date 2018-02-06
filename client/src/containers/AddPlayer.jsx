import { connect } from 'react-redux';

import Search from '../components/Search';
import { addPlayer } from '../actions';

const mapStateToProps = state => ({
  players: state.playerList,
});

const mapDispatchToProps = dispatch => ({
  onClick: (name) => {
    dispatch(addPlayer(name));
  },
});

const AddPlayer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default AddPlayer;
