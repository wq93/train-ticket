import {
  ACTION_SET_FROM,
  ACTION_SET_TO,
  ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
  ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
  ACTION_SET_CITY_DATA,
  ACTION_SET_IS_LOADING_CITY_DATA,
  ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
  ACTION_SET_HIGH_SPEED,
  ACTION_SET_DEPART_DATE,
} from './actions';

// 导出每个reduce
export default {
  // 出发地
  from(state = '北京', action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_FROM:
        return payload;
      default:
    }

    return state;
  },
  // 目的地
  to(state = '上海', action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_TO:
        return payload;
      default:
    }

    return state;
  },
  // 是否显示城市选择框
  isCitySelectorVisible(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_IS_CITY_SELECTOR_VISIBLE:
        return payload;
      default:
    }

    return state;
  },
  // 当前选择的城市
  currentSelectingLeftCity(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_CURRENT_SELECTING_LEFT_CITY:
        return payload;
      default:
    }

    return state;
  },
  // 城市信息
  cityData(state = null, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_CITY_DATA:
        return payload;
      default:
    }

    return state;
  },
  // 是否加载城市信息
  isLoadingCityData(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_IS_LOADING_CITY_DATA:
        return payload;
      default:
    }

    return state;
  },
  // 是否显示城市选择框
  isDateSelectorVisible(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_IS_DATE_SELECTOR_VISIBLE:
        return payload;
      default:
    }

    return state;
  },
  // 高铁
  highSpeed(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_HIGH_SPEED:
        return payload;
      default:
    }

    return state;
  },
  // 出发时间
  departDate(state = Date.now(), action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_DEPART_DATE:
        return payload;
      default:
    }

    return state;
  },
};
