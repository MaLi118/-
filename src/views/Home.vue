<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { concatArray } from '@/utils/arrayUtils.js'
import { dateIsLeapYear, dateFormat, dateAdd, StringToDate, dateFiff, getWeek, maxDayOfDate, IsValidDate, CheckDateTime } from '@/utils/dateUtils.js'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created () {
    // 验证合并数组
    const a = concatArray([1], [5, 6])
    console.log(a)

    /*
    验证是否闰年，闰年返回1，不是返回0
    参数：date:时间(Date)
    结果返回：是否闰年
    */
    const date = new Date('04-30-1900')
    console.log(date.getFullYear())
    const b = dateIsLeapYear(date)
    console.log(b)

    /*
    日期格式化验证
    格式 YYYY/yyyy/YY/yy 表示年份
    MM/M 月份
    W/w 星期
    dd/DD/d/D 日期
    hh/HH/h/H 时间
    mm/m 分钟
    ss/SS/s/S 秒
    参数：date: 时间(Date)
          strfmt: 需要返回的日期格式, 如 yyyy-MM-dd HH:mm:ss
    */
    const c = dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss w')
    console.log(c)

    /*
    日期计算验证
    为日期添加相应的时间
    参数: date: 时间(Date)
          strInterval：取值 s(秒，即按秒添加)，n(分)，h(小时),d(天)，w(周)，m(月)，y(年)
          number: 添加的时间，可为负数，负数则时间减少
    结果返回: 返回添加后的时间(Date)
    */
    const d = dateAdd(new Date(), 'm', -1)
    console.log(dateFormat(d, 'yyyy-MM-dd HH:mm:ss w'))

    /*
    字符串转成日期类型验证
    参数： dateStr:格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd
    结果返回: 转换后的日期，无法转换返回null
    */
    const e = StringToDate('2019/04/01')
    console.log(e)

    /*
    比较日期差 dtEnd 格式为日期型或者有效日期格式字符串
    参数： date:开始时间
    strInterval：返回的时间差精度，取值 s(秒，即按秒添加)，n(分)，h(小时),d(天)，w(周)，m(月)，y(年)
    dtEnd: 结束时间
    结果返回：相应精度的数量
    */
    const f = dateFiff('03-29-2020 12:01:05', 'd', new Date())
    console.log(f)

    /*
    日期输出星期几
    结果返回: 星期一、星期二。。。。。。
    */
    const g = getWeek(new Date())
    console.log(g)

    /*
    取得当前日期所在月的最大天数
    参数: date：日期
    结果返回：返回日期所在月的最大天数
    */
    const h = maxDayOfDate(new Date('2-14-2020'))
    console.log(h)

    /*
    日期合法性验证
    格式为：YYYY-MM-DD或YYYY/MM/DD
    参数：DateStr: 日期字符串
    结果返回：返回是否格式正确
    */
    const i = IsValidDate('2020/04/19')
    console.log(i)

    /*
    日期时间检查
    格式为：YYYY-MM-DD HH:MM:SS
    参数：str: 日期字符串
    结果返回：返回是否格式正确
    */
    const j = CheckDateTime('2019-12-10 12:30:59')
    console.log(j)
  },
  methods: {}
}
</script>
