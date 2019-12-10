import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { ORDER_DEPART } from './constant';
import './Bottom.css';

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
    </div>
  )
}