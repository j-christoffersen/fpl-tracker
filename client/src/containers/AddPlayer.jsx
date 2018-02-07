import { connect } from 'react-redux';

import Search from '../components/Search';
import { addPlayer } from '../actions';

const mapStateToProps = state => ({
  items: state.playerList,
  stat: state.stat,
});

const mapDispatchToProps = dispatch => ({
  onClick: (name, stat) => {
    dispatch(addPlayer(name, stat));
  },
});

const mergeProps = (stateProps, dispatchProps) => (
  Object.assign({}, {
    buttonString: 'Add Player',
    items: stateProps.items,
    onClick: (name) => { dispatchProps.onClick(name, stateProps.stat); },
  })
);

const AddPlayer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Search);

export default AddPlayer;
