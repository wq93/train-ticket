import React from 'react';
import PropTypes from 'prop-types';

import switchImg from './imgs/switch.svg';
import './Journey.css';

export default function Journey(props) {
  const { from, to, exchangeFromTo, showCitySelector, } = props;

  return (
    <div className='journey'>
      <div
        className="journey-station"
        onClick={() => showCitySelector(true)}
      >
        <input
          type="text"
          readOnly
          name="from"
          value={from}
          className="journey-input journey-from"
        />
      </div>
      <div className="journey-switch" onClick={() => exchangeFromTo()}>
        <img src={switchImg} width="70" height="40" alt="switch" />
      </div>
      <div
        className="journey-station"
        onClick={() => showCitySelector(false)}
      >
        <input
          type="text"
          readOnly
          name="to"
          value={to}
          className="journey-input journey-to"
        />
      </div>
    </div>
  );
}

/**
 * @prop from 出发地
 * @prop to 目的地
 * @prop exchangeFromTo 互换出发地/目的地
 * @prop showCitySelector 显示城市选择框的方法
 **/
Journey.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  exchangeFromTo: PropTypes.func.isRequired,
  showCitySelector: PropTypes.func.isRequired,
}