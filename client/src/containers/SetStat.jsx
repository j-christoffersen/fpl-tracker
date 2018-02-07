import { connect } from 'react-redux';

import Dropdown from '../components/Dropdown';
import { setStat } from '../actions';

const mapStateToProps = state => ({
  items: [
    'minutes',
    'goalsScored',
    'assists',
    'cleanSheets',
    'goalsConceded',
    'ownGoals',
    'penaltiesSaved',
    'penaltiesMissed',
    'yellowCards',
    'redCards',
    'saves',
    'bonus',
    'value',
    'total',
  ].map((item, i) => ({
    name: item,
    id: i,
  })),
  buttonString: 'Set Stat',
  stat: state.stat,
});

const mapDispatchToProps = dispatch => ({
  onChange: (name) => {
    dispatch(setStat(name));
  },
});

const SetStat = connect(mapStateToProps, mapDispatchToProps)(Dropdown);

export default SetStat;
