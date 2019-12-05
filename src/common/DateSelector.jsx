import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { h0 } from '../common/fp';
import Header from './Header.jsx';
import getLastThreeMonth from '../util/getLastThreeMonth';

import './DateSelector.css';

function Month(props) {
  const { startingTimeInMonth, onSelect } = props;

  const startDay = new Date(startingTimeInMonth);
  const currentDay = new Date(startingTimeInMonth);

  let days = [];

  while (currentDay.getMonth() === startDay.getMonth()) {
    days.push(currentDay.getTime());
    currentDay.setDate(currentDay.getDate() + 1);
  }
  // 计算本月第一天是星期几, 补齐空白
  days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
    .fill(null)
    .concat(days);

  // 计算本月最后一天是星期几, 补齐空白
  const lastDay = new Date(days[ days.length - 1 ]);
  days = days.concat(
    new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0)
      .fill(null)
  );

  const weeks = [];

  // 因为前面已经补齐 所有这里的days一定是7的整数倍
  for (let row = 0; row < days.length / 7; ++row) {
    const week = days.slice(row * 7, (row + 1) * 7);
    weeks.push(week);
  }

  return (
    <table className="date-table">
      <thead>
      <tr>
        <td colSpan='7'>
          <h5>
            { `${ startDay.getFullYear() }年${ startDay.getMonth() + 1 }月` }
          </h5>
        </td>
      </tr>
      </thead>
      <tbody>
      <tr className="data-table-weeks">
        <th>周一</th>
        <th>周二</th>
        <th>周三</th>
        <th>周四</th>
        <th>周五</th>
        <th className="weekend">周六</th>
        <th className="weekend">周日</th>
      </tr>

      </tbody>
    </table>
  );


}

/*
* @props startingTimeInMonth 本月的开始时间戳
* @props onSelect 点击当前时间的选择方法
* */
Month.propTypes = {
  startingTimeInMonth: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function DateSelector(props) {
  const {
    show,
    onSelect,
    onBack,
  } = props;

  const [ monthSequence ] = useState(getLastThreeMonth());

  return (
    <div className={ classnames('date-selector', { hidden: !show }) }>
      <Header title='日期选择' onBack={ onBack }/>
      <div className="date-selector-tables">
        {
          monthSequence.map(month => {
            return (
              <Month
                key={ month }
                onSelect={ onSelect }
                startingTimeInMonth={ month }
              />
            )
          })
        }
      </div>
    </div>
  );
}

export default DateSelector;

DateSelector.propTypes = {
  show: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
}