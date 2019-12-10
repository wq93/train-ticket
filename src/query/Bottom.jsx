import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { ORDER_DEPART } from './constant';
import './Bottom.css';

// 筛选类别的每一项
const Filter = memo(function Filter(props) {
  const { name, checked, value, dispatch } = props;

  return (
    <li
      className={classnames({ checked })}
      onClick={() => dispatch({ payload: value, type: 'toggle' })}
    >
      {name}
    </li>
  );
});

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};


// 筛选类别
const Option = memo(function Option(props) {
  const { title, options, checkedMap, dispatch } = props;

  return (
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {options.map(option => {
          return (
            <Filter
              key={option.value}
              {...option}
              checked={option.value in checkedMap}
              dispatch={dispatch}
            />
          );
        })}
      </ul>
    </div>
  );
});

// 综合筛选框
const BottomModal = memo(function (props) {
  const {
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
    toggleIsFiltersVisible,
  } = props;

  const optionGroup = [
    {
      title: '坐席类型',
      options: ticketTypes,
      checkedMap: checkedTicketTypes,
    },
    {
      title: '车次类型',
      options: trainTypes,
      checkedMap: checkedTrainTypes,
    },
    {
      title: '出发车站',
      options: departStations,
      checkedMap: checkedDepartStations,
    },
    {
      title: '到达车站',
      options: arriveStations,
      checkedMap: checkedArriveStations,
    },
  ];

  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
                        <span
                          className='reset'
                        >
                            重置
                        </span>
            <span className="ok">
                            确定
                        </span>
          </div>
          <div className="options">
            {optionGroup.map(group => (
              <Option {...group} key={group.title} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});


export default function Bottom(props) {
  const {
    toggleOrderType,
    toggleHighSpeed,
    toggleOnlyTickets,
    toggleIsFiltersVisible,
    highSpeed,
    orderType,
    onlyTickets,
    isFiltersVisible,

    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
  } = props;

  return (
    <div className="bottom">
      <div className="bottom-filters">
                <span className="item" onClick={ toggleOrderType }>
                    <i className="icon">&#xf065;</i>
                  { orderType === ORDER_DEPART ? '出发 早→晚' : '耗时 短→长' }
                </span>
        <span
          className={ classnames('item', { 'item-on': highSpeed }) }
          onClick={ toggleHighSpeed }
        >
                    <i className="icon">{ highSpeed ? '\uf43f' : '\uf43e' }</i>
                    只看高铁动车
                </span>
        <span
          className={ classnames('item', { 'item-on': onlyTickets }) }
          onClick={ toggleOnlyTickets }
        >
                    <i className="icon">{ onlyTickets ? '\uf43d' : '\uf43c' }</i>
                    只看有票
                </span>
        <span
          className={ classnames('item', {
            'item-on': isFiltersVisible
          }) }
          onClick={ toggleIsFiltersVisible }
        >
                    <i className="icon">{ '\uf0f7' }</i>
                    综合筛选
                </span>
      </div>
      {
        isFiltersVisible && (
          <BottomModal
            ticketTypes={ticketTypes}
            trainTypes={trainTypes}
            departStations={departStations}
            arriveStations={arriveStations}
            checkedTicketTypes={checkedTicketTypes}
            checkedTrainTypes={checkedTrainTypes}
            checkedDepartStations={checkedDepartStations}
            checkedArriveStations={checkedArriveStations}
            departTimeStart={departTimeStart}
            departTimeEnd={departTimeEnd}
            arriveTimeStart={arriveTimeStart}
            arriveTimeEnd={arriveTimeEnd}
            setCheckedTicketTypes={setCheckedTicketTypes}
            setCheckedTrainTypes={setCheckedTrainTypes}
            setCheckedDepartStations={setCheckedDepartStations}
            setCheckedArriveStations={setCheckedArriveStations}
            setDepartTimeStart={setDepartTimeStart}
            setDepartTimeEnd={setDepartTimeEnd}
            setArriveTimeStart={setArriveTimeStart}
            setArriveTimeEnd={setArriveTimeEnd}
            toggleIsFiltersVisible={toggleIsFiltersVisible}
          />
        )
      }
    </div>
  )
}