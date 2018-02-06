import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SelectedPlayers from '../containers/SelectedPlayers';
import AddPlayer from '../containers/AddPlayer';

import { init } from '../actions';

class App extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    return (
      <div className="row">
        <AddPlayer />
        <div className="col-lg-4 selectors">
          <SelectedPlayers />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  init: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  init: () => {
    dispatch(init());
  },
});

const AppMap = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppMap;
