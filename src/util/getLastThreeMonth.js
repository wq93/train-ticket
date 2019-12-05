/*
* 该文件返回当前月份, 后两个月份的1号0点的时间戳
* */

export default function () {
  // 计算最近三个月的第一天0点的时间戳
  const now = new Date();
  // 获取本月的第一天0点的时间戳
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  now.setDate(1);

  // 保存近三个月的第一天零点的时间戳
  const monthSequence = [now.getTime()];

  // 下个月
  now.setMonth(now.getMonth() + 1);
  monthSequence.push(now.getTime());

  // 下下个月
  now.setMonth(now.getMonth() + 1);
  monthSequence.push(now.getTime());

  return monthSequence || [];
}