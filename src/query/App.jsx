import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import './App.css';

import Header from '../common/Header';

import { h0 } from '../common/fp';

function App(props) {
  const {
    from,
    to,
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  }, [])

  return (
    <div>
      <div className="header-wrapper">
        <Header title={`${from} ⇀ ${to}`} onBack={onBack} />
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);