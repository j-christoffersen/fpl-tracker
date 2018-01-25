import { connect } from 'react-redux';

import Players from '../components/Players';

const mapStateToProps = state => (
  {
    players: state,
  }
);

const SelectedPlayers = connect(mapStateToProps)(Players);

export default SelectedPlayers;
