/** 星期字符串数组 */
const WEEKDAYS: string[] = ["日", "一", "二", "三", "四", "五", "六"];

/**
 * 获取时间星期几
 * @param dateString 时间字符串
 */
export const getWeekday = (dateString: string) => {
  const date = new Date(dateString);
  return WEEKDAYS[date.getDay()];
};

/** 默认格式 */
const defaultFormat: Record<string, string> = {
  time: "yyyy-mm-dd hh:mm:ss",
  timestr: "yyyymmddhhmmss",
  day: "yyyy-mm-dd"
};

/** 添零 */
const addLeadingZero = (num: number): string => (num < 10 ? "0" + num : num.toString());

/**
 * 时间戳转时间字符串
 * @param timestamp 时间戳，若为-1，则获取当前时间
 * @param format 时间格式字符串，如 'yyyy-mm-dd hh:mm:ss'，预设 `time` | `timestr` | `day`
 * @param showWeekday 是否显示星期数，默认为false
 */
export function timestampToTime(
  timestamp: number | string,
  format: string | "time" | "timestr" | "day" = "time",
  showWeekday = false
) {
  // 若时间戳为字符串转为数字
  if (typeof timestamp == "string") {
    timestamp = parseInt(timestamp, 10);
  }
  // 时间戳位-1获取当前时间
  if (timestamp === -1) {
    timestamp = Date.now();
  }
  // 时间戳转为13
  if (String(timestamp).length === 10) {
    timestamp *= 1000;
  }

  const date: Date = new Date(timestamp);

  const year: string = addLeadingZero(date.getFullYear());
  const month: string = addLeadingZero(date.getMonth() + 1);
  const day: string = addLeadingZero(date.getDate());
  const hours: string = addLeadingZero(date.getHours());
  const minutes: string = addLeadingZero(date.getMinutes());
  const seconds: string = addLeadingZero(date.getSeconds());
  const weekday: string = showWeekday ? " " + WEEKDAYS[date.getDay()] : "";

  // 根据传入的格式替换时间字符串
  format = defaultFormat[format] || format;
  const formatString: string = format
    .replace("yyyy", year)
    .replace("mm", month)
    .replace("dd", day)
    .replace("hh", hours)
    .replace("mm", minutes)
    .replace("ss", seconds)
    .replace("w", weekday);

  return formatString;
}
