import { connect } from 'react-redux';

import Search from '../components/Graph';

const mapStateToProps = state => ({
  data: [0, 1, 1, 1, 0, 0, 1, 0, 2, 0, 0, 2, 0, 1, 0]
    .map((value, i) => ({ gameweek: i + 1, value })),
  width: 500,
  height: 500,
});

const StatsGraph = connect(mapStateToProps)(Search);

export default StatsGraph;
