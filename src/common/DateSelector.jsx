import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Header from './Header.jsx';

import './DateSelector.css';

function DateSelector(props) {
  const {
    show,
    onSelect,
    onBack,
  } = props;
  return (
    <div className={ classnames('date-selector', {hidden: !show}) }>
      <Header title='日期选择' onBack={ onBack }/>

    </div>
  );
}

export default DateSelector;

DateSelector.propTypes = {
  show: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
}