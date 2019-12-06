import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import URI from 'urijs';
import dayjs from 'dayjs';

import Header from '../common/Header';

import { h0 } from '../common/fp';

import './App.css';

import {
  setFrom,
  setTo,
  setDepartDate,
  setHighSpeed,
  setSearchParsed,
  setTrainList,
  setTicketTypes,
  setTrainTypes,
  setDepartStations,
  setArriveStations
} from './actions';

function App(props) {
  const {
    trainList,
    from,
    to,
    departDate,
    highSpeed,
    searchParsed,
    dispatch,
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
  } = props;

  // 解析url的query参数
  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const { from, to, date, highSpeed } = queries;

    dispatch(setFrom(from));
    dispatch(setTo(to));
    dispatch(setDepartDate(h0(dayjs(date).valueOf())));
    dispatch(setHighSpeed(highSpeed === 'true'));

    dispatch(setSearchParsed(true));
  }, [])

  // 获取车次列表
  useEffect(() => {
    // 没有解析url参数 不发起请求
    if(!searchParsed) return;

    // 序列化请求参数
    const url = new URI('/rest/query')
      .setSearch('from', from)
      .setSearch('to', to)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('highSpeed', highSpeed)
      .setSearch('orderType', orderType)
      .setSearch('onlyTickets', onlyTickets)
      .setSearch(
        'checkedTicketTypes',
        Object.keys(checkedTicketTypes).join()
      )
      .setSearch(
        'checkedTrainTypes',
        Object.keys(checkedTrainTypes).join()
      )
      .setSearch(
        'checkedDepartStations',
        Object.keys(checkedDepartStations).join()
      )
      .setSearch(
        'checkedArriveStations',
        Object.keys(checkedArriveStations).join()
      )
      .setSearch('departTimeStart', departTimeStart)
      .setSearch('departTimeEnd', departTimeEnd)
      .setSearch('arriveTimeStart', arriveTimeStart)
      .setSearch('arriveTimeEnd', arriveTimeEnd)
      .toString();

    fetch(url)
      .then(response => response.json())
      .then(result => {
        const {
          dataMap: {
            directTrainInfo: {
              trains,
              filter: {
                ticketType,
                trainType,
                depStation,
                arrStation,
              },
            },
          },
        } = result;
        // 设置车次列表
        dispatch(setTrainList(trains));
        // 设置坐席类型
        dispatch(setTicketTypes(ticketType));
        // 设置车次类型
        dispatch(setTrainTypes(trainType));
        // 设置出发站点
        dispatch(setDepartStations(depStation));
        // 设置到达站点
        dispatch(setArriveStations(arrStation));
      })

  }, [
    from,
    to,
    departDate,
    highSpeed,
    searchParsed,
    orderType,
    onlyTickets,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd
  ])

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