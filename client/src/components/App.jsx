import React from 'react';
// import PropTypes from 'prop-types';

import SelectedPlayers from '../containers/SelectedPlayers';
import AddPlayer from '../containers/AddPlayer';

class App extends React.Component {
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

export default App;
