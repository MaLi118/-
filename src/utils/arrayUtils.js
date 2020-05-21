
// ---------------------------------------------------
// 两个数组合并成一个大数组
// 参数：array1: 数组1
//       array2: 数组2
// 结果返回: 合并完的大数组
// ---------------------------------------------------
export function concatArray (array1, array2) {
  // 用Array.isArray()判定传入的两个参数是否为数组对象
  if ((Array.isArray(array1)) && (Array.isArray(array2))) {
    return array1.concat(array2)
  }
  return null
}
