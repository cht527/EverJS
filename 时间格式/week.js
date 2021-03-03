
import {buildFromDayOfYear} from './day';

const DATE_MILLISECONDS = 24 * 60 * 60 * 1000;

//  根据时间获取当前属于哪一周

export function weekOfYear(date, startDay, year) {
  var firstDay = new Date(year == null ? date.getFullYear() : year, 0, 1);
  var day = firstDay.getDay();
  var offset = (day - startDay + 7) % 7;
  firstDay.setDate(firstDay.getDate() - offset); // 第一天为0

  var offsetDay = Math.floor((Number(date) - Number(firstDay)) / DATE_MILLISECONDS);
  return Math.floor(offsetDay / 7) + 1;
}

// 根据年和当前周获取 起止时间

export function buildWeekRange(year, week, startDay) {
  var firstDay = new Date(year, 0, 1);
  var offset = (firstDay.getDay() - startDay + 7) % 7;
  var offsetDay = (week - 1) * 7 + 1 - offset;
  var start = buildFromDayOfYear(year, offsetDay);
  var end = new Date(+start);
  end.setDate(end.getDate() + 6);
  return [start, end];
} // WW 和 W
