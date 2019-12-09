import { useCallback } from 'react';
import { h0 } from './fp';

export default function (departDate, dispatch, prevDate, nextDate) {
  // 当前时间大于时间
  const isPrevDisabled = h0(departDate) <= h0();
  // 将来时间的大20天
  const isNextDisabled = h0(departDate) - h0() > 20 * 86400 * 1000;
  const prev = useCallback(() => {
    if (isPrevDisabled) return;
    dispatch(prevDate());
  }, [ isPrevDisabled ]);

  const next = useCallback(() => {
    if (isNextDisabled) return;
    dispatch(nextDate());
  }, [ isNextDisabled ]);
  return {
    isNextDisabled,
    isPrevDisabled,
    prev,
    next
  }
}