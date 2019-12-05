import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { h0 } from '../common/fp';
import Header from './Header.jsx';
import getLastThreeMonth from '../util/getLastThreeMonth';

import './DateSelector.css';

function Day(props) {
  const { day, onSelect } = props;
  if(!day) return <td className='null' />;
  const classes = [];
  const now = h0();
  // 如果日期比当前0点的时间戳小
  if(day < now) classes.push('disabled');

  // 判断是否是周末
  if([6, 0].includes(new Date(day).getDay())) {
    classes.push('weekend');
  }

  // 判断是否是今天
  const dateString = now === day ? '今天' : new Date(day).getDate();

  return (
    <td className={classnames(classes)} onClick={() => onSelect(day)}>
      {dateString}
    </td>
  )
}

Day.propTypes = {
  day: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

function Week(props) {
  const { days, onSelect } = props;
  return (
    <tr className="date-table-days">
      {days.map((day, idx) => {
        return <Day key={idx} day={day} onSelect={onSelect} />;
      })}
    </tr>
  );
}

/*
* @props days 每周的时间戳集合
* @props onSelect 点击当前时间的选择方法
* */
Week.propTypes = {
  days: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};
function Month(props) {
  const { startingTimeInMonth, onSelect } = props;

  const startDay = new Date(startingTimeInMonth);
  const currentDay = new Date(startingTimeInMonth);

  let days = [];

  // 如果currentDay月份还是本月, 则添加到days数组中, 再日期+1, 直到两个变量的月份不再相等
  while (currentDay.getMonth() === startDay.getMonth()) {
    days.push(currentDay.getTime()); // 保存时间戳
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
      {weeks.map((week, idx) => {
        return <Week key={idx} days={week} onSelect={onSelect} />;
      })}
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