import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './CitySelector.css';

export default function CitySelector(props) {
  const {
    show,
    cityData,
    isLoading,
    onBack,
    fetchCityData
  } = props;

  const [searchKey, setSearchKey] = useState('');

  const key = useMemo(() => searchKey.trim(), [searchKey]);

  useEffect(() => {
    if(!show || cityData || isLoading) return;
    fetchCityData();
  }, [ show, cityData, isLoading ])

  return (
    <div
      className={ classnames('city-selector', { hidden: !show }) }>
      <div className="city-search">
        <div className="search-back" onClick={() => onBack()}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="城市、车站的中文或拼音"
            value={ searchKey }
            onChange={ ( e ) => setSearchKey(e.target.value) }
          />
        </div>
        <i
          className={classnames('search-clean', {
            hidden: key.length === 0,
          })}
        >
          &#xf063;
        </i>
      </div>
    </div>
  );
}

/**
 * @prop show 显示城市选择框
 * @prop cityData 城市数据
 * @prop isLoading 是否在加载
 * @prop onBack 返回上一页函数
 * @prop fetchCityData 获取城市数据方法
 **/
CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  cityData: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  fetchCityData: PropTypes.func.isRequired,
}