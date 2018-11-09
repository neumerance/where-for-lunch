import React, { Component } from 'react';
import Condition from '../components/Condition/Condition';
import Lists from '../components/Place/Lists';

class HomePage extends Component {
  render() {
    return (
      <div className="row">
        <Condition />
        <Lists />
      </div>
    );
  }
}

export default HomePage;
