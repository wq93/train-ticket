import React, {
  useState,
  useMemo,
  useEffect,
  memo,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './CitySelector.css';

// 每条城市数据
const CityItem = memo(function (props) {
  const {
    name,
    onSelect
  } = props;

  return (
    <li className='city-li' onClick={ () => onSelect(name) }>
      { name }
    </li>
  );
});

CityItem.propTypes = {
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

// 以首字母分组的城市集合
const CitySection = memo(function (props) {
  const { title, cities = [], onSelect } = props;

  return (
    <ul className="city-ul">
      <li className="city-li" key="title" data-cate={title}>
        {title}
      </li>
      {cities.map(city => {
        return (
          <CityItem
            key={city.name}
            name={city.name}
            onSelect={onSelect}
          />
        );
      })}
    </ul>
  );
});

CitySection.propTypes = {
  title: PropTypes.string.isRequired,
  cities: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
};

// 城市总列表
const CityList = memo(function (props) {
  const { sections, onSelect, toAlpha } = props;
  const alphabet = Array.from(new Array(26), (ele, index) => {
    return String.fromCharCode(65 + index);
  });
  return (
    <div className="city-list">
      <div className="city-cate">
        {sections.map(section => {
          return (
            <CitySection
              key={section.title}
              title={section.title}
              cities={section.citys}
              onSelect={onSelect}
            />
          );
        })}
      </div>
      <div className="city-index">
        {alphabet.map(alpha => {
          return (
            <AlphaIndex
              key={alpha}
              alpha={alpha}
              onClick={toAlpha}
            />
          );
        })}
      </div>
    </div>
  );
});

CityList.propTypes = {
  sections: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  toAlpha: PropTypes.func.isRequired,
};

// 首字母导航列表
const AlphaIndex = memo(function (props) {
  const { alpha, onClick } = props;
  return (
    <i className="city-index-item" onClick={() => onClick(alpha)}>
      {alpha}
    </i>
  );
})

AlphaIndex.propTypes = {
  alpha: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

// 每项搜索结果
const SuggestItem = memo(function SuggestItem(props) {
  const { name, onClick } = props;

  return (
    <li className="city-suggest-li" onClick={() => onClick(name)}>
      {name}
    </li>
  );
});

SuggestItem.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

// 搜索结果模块
const Suggest = memo(function (props) {
  const { searchKey, onSelect } = props;
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch('/rest/search?key=' + encodeURIComponent(searchKey))
      .then(res => res.json())
      .then(data => {
        const { result, searchKey: sKey } = data;

        if (sKey === searchKey) {
          setResult(result);
        }
      });
  }, [searchKey])

  // 兼容没有搜索结果的情况
  const fallBackResult = useMemo(() => {
    if (!result.length) {
      return [
        {
          display: searchKey,
        },
      ];
    }

    return result;
  }, [result, searchKey]);

  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {fallBackResult.map(item => {
          return (
            <SuggestItem
              key={item.display}
              name={item.display}
              onClick={onSelect}
            />
          );
        })}
      </ul>
    </div>
  );
})

Suggest.propTypes = {
  searchKey: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const CitySelector = memo(function (props) {
  const {
    show,
    cityData,
    isLoading,
    onBack,
    fetchCityData,
    onSelect
  } = props;

  const [searchKey, setSearchKey] = useState('');

  const key = useMemo(() => searchKey.trim(), [searchKey]);

  useEffect(() => {
    if(!show || cityData || isLoading) return;
    fetchCityData();
  }, [ show, cityData, isLoading ])

  // 点击定位到首字母类别
  const toAlpha = useCallback(alpha => {
    document.querySelector(`[data-cate='${alpha}']`).scrollIntoView({ behavior: 'smooth' });
  }, []);

  // 展示城市数据
  const outputCitySections = () => {
    if(isLoading) {
      return <div>Loading...</div>
    }
    if(cityData) {
      return (
        <CityList
          sections={ cityData.cityList }
          onSelect={ onSelect }
          toAlpha={ toAlpha }
        />
      )
    }
  }

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
      {Boolean(key) && (
        <Suggest searchKey={key} onSelect={key => onSelect(key)} />
      )}
      {outputCitySections()}
      { outputCitySections() }
    </div>
  );
});

export default CitySelector;

/**
 * @prop show 显示城市选择框
 * @prop cityData 城市数据
 * @prop isLoading 是否在加载
 * @prop onBack 返回上一页函数
 * @prop fetchCityData 获取城市数据方法
 * @prop setSelectedCity 设置选择的城市
 **/
CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  cityData: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  fetchCityData: PropTypes.func.isRequired,
  setSelectedCity: PropTypes.func.isRequired,
}