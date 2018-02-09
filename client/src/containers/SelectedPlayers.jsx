import { connect } from 'react-redux';

import Players from '../components/Players';
import { removePlayer } from '../actions';

const mapStateToProps = state => ({
  players: state.players,
});

const mapDispatchToProps = dispatch => ({
  onClose: id => dispatch(removePlayer(id)),
});

const SelectedPlayers = connect(mapStateToProps, mapDispatchToProps)(Players);

export default SelectedPlayers;
