import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Condition from 'components/Condition/Condition';

class HomePage extends Component {
  render() {
    return (
      <div className="row">
        <Condition />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);

HomePage.propTypes = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
