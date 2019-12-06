import { createStore, combineReducers, applyMiddleware } from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';

import { h0 } from '../common/fp';
import { ORDER_DEPART } from './constant';

export default createStore(
    combineReducers(reducers),
    {
        from: null, // 出发地
        to: null, // 目的地
        departDate: h0(Date.now()), // 出发日期
        highSpeed: false, // 高铁/动车
        trainList: [], // 列车列表
        orderType: ORDER_DEPART, // 耗时长短
        onlyTickets: false, // 只看有票
        ticketTypes: [], // 坐席类型
        checkedTicketTypes: {}, // 坐席类型集合
        trainTypes: [], // 车次类型
        checkedTrainTypes: {}, // 车次类型集合
        departStations: [], // 出发站点
        checkedDepartStations: {}, // 选中出发站点
        arriveStations: [], // 到达车站
        checkedArriveStations: {},  // 选中到达车站
        departTimeStart: 0, // 出发时间起点
        departTimeEnd: 24, // 出发时间结束点
        arriveTimeStart: 0, // 到达时间起点
        arriveTimeEnd: 24, // 到达时间结束点
        isFiltersVisible: false, // 是否隐藏综合筛选框
        searchParsed: false, // 解析查询参数
    },
    applyMiddleware(thunk)
);
