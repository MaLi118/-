// ---------------------------------------------------
// 判断是否闰年
// 参数：date:时间(Date)
// 结果返回：是否闰年
// ---------------------------------------------------
export function dateIsLeapYear (date) {
  // 年份能被4整除且不能被100整除
  // 或年份能被400整除
  if (date instanceof Date) { // 判定date是否为Date对象
    // 如果是Date对象则用date.getFullYear()返回年份再计算
    if ((date.getFullYear() % 4 === 0 && date.getFullYear() % 100 !== 0) || (date.getFullYear() % 400 === 0)) {
      // 闰年返回true
      return true
    }
    // 不是闰年返回false
    return false
  }
  return null
}

// ---------------------------------------------------
// 日期格式化
// 格式 YYYY/yyyy/YY/yy 表示年份
// MM/M 月份
// W/w 星期
// dd/DD/d/D 日期
// hh/HH/h/H 时间
// mm/m 分钟
// ss/SS/s/S 秒
// 参数：date: 时间(Date)
//       strfmt: 需要返回的日期格式, 如 yyyy-MM-dd HH:mm:ss
// 结果返回: 格式化后的字符串
// ---------------------------------------------------
export function dateFormat (date, strfmt) {
  // 定义一个函数，当要保留两位格式时，如果实际只有一位，自动在前面加上0
  function addZero (n) {
    if (String(n).length === 2) {
      return n
    }
    return '0' + n
  }
  // 定义一个星期数组
  var arrWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  // 判定传入参数类型
  if ((date instanceof Date) && (typeof (strfmt) === 'string')) {
    // 返回格式化的字符串
    var str = strfmt.replace(/YYYY|yyyy/, date.getFullYear()).replace(/YY|yy/, addZero(date.getFullYear() % 100)).replace(/MM/, addZero(date.getMonth() + 1)).replace(/M/, date.getMonth() + 1).replace(/DD|dd/, addZero(date.getDate())).replace(/D|d/, date.getDate()).replace(/HH|hh/, addZero(date.getHours())).replace(/H|h/, date.getHours()).replace(/mm/, addZero(date.getMinutes())).replace(/m/, date.getMinutes()).replace(/SS|ss/, addZero(date.getSeconds())).replace(/S|s/, date.getSeconds()).replace(/W|w/, arrWeek[date.getDay()])
    return str
  }
  return null
}

// +---------------------------------------------------
// | 日期计算
// 为日期添加相应的时间
// 参数: date: 时间(Date)
//       strInterval：取值 s(秒，即按秒添加)，n(分)，h(小时),d(天)，w(周)，m(月)，y(年)
//       number: 添加的时间，可为负数，负数则时间减少
// 结果返回: 返回添加后的时间(Date)
// +---------------------------------------------------
export function dateAdd (date, strInterval, Number) {
  // 判定传入参数类型，且判定strInterval的长度
  if ((date instanceof Date) && ((typeof (strInterval) === 'string') && (strInterval.length === 1)) && (typeof (Number) === 'number')) {
    Number = parseInt(Number)
    switch (strInterval) {
      case 'y':date.setFullYear(date.getFullYear() + Number)
        break
      case 'm':date.setMonth(date.getMonth() + Number)
        break
      case 'w':date.setDate(date.getDate() + 7 * Number)
        break
      case 'd':date.setDate(date.getDate() + Number)
        break
      case 'h':date.setHours(date.getHours() + Number)
        break
      case 'n':date.setMinutes(date.getMinutes() + Number)
        break
      case 's':date.setSeconds(date.getSeconds() + Number)
        break
      default:return null
    }
    return date
  }
  return null
}

// +---------------------------------------------------
// | 字符串转成日期类型
// | 参数： dateStr:格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd
//   结果返回: 转换后的日期，无法转换返回null
// +---------------------------------------------------
export function StringToDate (DateStr) {
  if (typeof (DateStr) === 'string') {
    // 获取1970年1月1日午夜到指定日期（字符串）的毫秒数
    var time = Date.parse(DateStr)
    var myDate = new Date(time)
    // 判断获取的时间不是Number类型,不是合法的日期格式
    if (isNaN(time)) {
      // 无法转换返回null
      return null
    }
    return myDate
  }
  return null// 无法转换返回null
}

// +---------------------------------------------------
// | 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串
//  参数： date:开始时间
// strInterval：返回的时间差精度，取值 s(秒，即按秒添加)，n(分)，h(小时),d(天)，w(周)，m(月)，y(年)
// dtEnd: 结束时间
//  结果返回：相应精度的数量
// +---------------------------------------------------
export function dateFiff (date, strInterval, dtEnd) {
  // 判断输入参数类型
  if (((date instanceof Date) || (typeof (date) === 'string')) && ((typeof (strInterval) === 'string') && (strInterval.length === 1)) && ((dtEnd instanceof Date) || (typeof (dtEnd) === 'string'))) {
    // 判断日期字符串是否为有效日期格式字符串
    if (isNaN(Date.parse(date)) || isNaN(Date.parse(dtEnd))) {
      return null
    } else {
      if (typeof (date) === 'string') {
        // 如果开始时间是字符串型则转换为日期型
        date = StringToDate(date)
      }
      if (typeof (dtEnd) === 'string') {
        // 如果结束时间是字符串型则转换为日期型
        dtEnd = StringToDate(dtEnd)
      }
      // 判断返回的相应时间差精度
      switch (strInterval) {
        case 's':return parseInt((dtEnd - date) / 1000)
        case 'n':return parseInt((dtEnd - date) / 60000)
        case 'h':return parseInt((dtEnd - date) / 3600000)
        case 'd':return parseInt((dtEnd - date) / 86400000)
        case 'w':return parseInt((dtEnd - date) / (86400000 * 7))
        case 'm':return (dtEnd.getMonth() + 1) - (date.getMonth() + 1) + ((dtEnd.getFullYear() - date.getFullYear()) * 12)
        case 'y':return dtEnd.getFullYear() - date.getFullYear()
        default:return null
      }
    }
  }
  return null
}

// +---------------------------------------------------
// | 日期输出星期几
// 结果返回: 星期一、星期二。。。。。。
// +---------------------------------------------------
export function getWeek (date) {
  // 定义一个星期数组
  var arrWeek = ['日', '一', '二', '三', '四', '五', '六']
  // 判断传入参数是否为日期对象
  if (date instanceof Date) { return '星期' + arrWeek[date.getDay()] }
  return null
}

// +---------------------------------------------------
// | 取得当前日期所在月的最大天数
// 参数: date：日期
// 结果返回：返回日期所在月的最大天数
// +---------------------------------------------------
export function maxDayOfDate (date) {
  if (date instanceof Date) {
    var ary = [date.getFullYear(), date.getMonth()]
    var date1 = new Date(ary[0], ary[1], 1)
    var date2 = new Date(ary[0], ary[1] + 1, 1)
    var days = (date2 - date1) / (1000 * 60 * 60 * 24)
    // 最大天数
    return days
  }
  return null
}
// +---------------------------------------------------
// | 日期合法性验证
// | 格式为：YYYY-MM-DD或YYYY/MM/DD
//   参数：DateStr: 日期字符串
//   结果返回：返回是否格式正确
// +---------------------------------------------------
export function IsValidDate (DateStr) {
  if (typeof (DateStr) === 'string') {
    if (DateStr.charAt(4) === '/') { var dateArray = DateStr.split('/') } else if (DateStr.charAt(4) === '-') { dateArray = DateStr.split('-') } else { return false }
    var year = Number(dateArray[0])
    var month = Number(dateArray[1])
    var date = Number(dateArray[2])
    var dateObj = new Date(year, month - 1, date)
    if ((year === dateObj.getFullYear()) && (month === (dateObj.getMonth() + 1)) && (date === dateObj.getDate())) {
      return true
    }
    return false
  }
  return false
}

// +---------------------------------------------------
// | 日期时间检查
// | 格式为：YYYY-MM-DD HH:MM:SS
//   参数：str: 日期字符串
//   结果返回：返回是否格式正确`
// +---------------------------------------------------
export function CheckDateTime (str) {
  if (typeof (str) === 'string') {
    var reg = /^(\d{1,4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/
    var r = str.match(reg)// 返回第一个完整匹配及其相关的捕获组（Array）
    if (r === null) return false
    r[2] = r[2] - 1
    var d = new Date(r[1], r[2], r[3], r[4], r[5], r[6])
    if (d.getFullYear() !== Number(r[1])) return false
    if (d.getMonth() !== Number(r[2])) return false
    if (d.getDate() !== Number(r[3])) return false
    if (d.getHours() !== Number(r[4])) return false
    if (d.getMinutes() !== Number(r[5])) return false
    if (d.getSeconds() !== Number(r[6])) return false
    return true
  }
  return false
}
