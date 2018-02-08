import { connect } from 'react-redux';

import Search from '../components/Graph';

const mapStateToProps = state => ({
  data: state.players.map(player => (
    (player[state.stat] || [])
      .map((value, i) => ({ gameweek: i + 1, value }))
  )),
  width: 500,
  height: 500,
});

const StatsGraph = connect(mapStateToProps)(Search);

export default StatsGraph;
