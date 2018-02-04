import { connect } from 'react-redux';

import Players from '../components/Players';

const mapStateToProps = state => (
  {
    players: state.players,
  }
);

const SelectedPlayers = connect(mapStateToProps)(Players);

export default SelectedPlayers;
