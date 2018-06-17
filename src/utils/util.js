/**
 * 取得number剔除后置00后剩余的值的字符串形式
 * @param {number} 1234000000
 * @return {string} '1234'
 */
export const getNumberWithoutPostPositiveZero = number => {
  if (number == null) return ''
  let temp = String(number)
  if (temp === '') return ''
  // 从最右侧开始查找'00'，并将找到的00剔除后，再次查找。直到再也找不出'00'为止
  while (temp.match(/00$/) !== null) {
    temp = temp.slice(0, -2)
  }
  return temp
}

/**
 * 增加后缀00，恢复10位的number
 * @param {string} '1234'
 * @return {number} 1234000000
 */
export const getNumber = str => {
  if (str == null || str === '') return undefined
  while (str.match(/^\d{10}$/) === null) {
    str = `${str}00`
  }
  return Number(str)
}

/**
 * 取得子级类别数组的正则表达式
 * @param {number} 1234000000
 * @return {regexp} /^1234(0[1-9]|[1-9][0-9])0000$/
 */
export const getRegExpForChildrenCategoriesByNumber = number => {
  const reference = getNumberWithoutPostPositiveZero(number)
  const len = reference.length
  return new RegExp(`^${reference}(0[1-9]|[1-9][0-9])(0){${8 - len}}$`)
}

/**
 * 取得父级元素的number
 * @param {number} 1234000000
 * @return {number} 1200000000
 */
export const getParentNumber = number => {
  const temp = getNumberWithoutPostPositiveZero(number)
  // 如果不符合条件或没有父级元素
  if (temp.length <= 2) return undefined
  return getNumber(temp.slice(0, -2))
}

/**
 * 取得祖先元素的number
 * @param {number} 1234560000
 * @return {number} 1200000000
 */
export const getAncestorNumber = number => {
  const temp = getNumberWithoutPostPositiveZero(number)
  // 如果不符合条件或没有父级元素
  if (temp.length < 2) return undefined
  return getNumber(temp.slice(0, 2))
}

/**
 * 取得该元素及所有上级元素组成的number数组
 * @param {number} 1234560000
 * @return {array} [1200000000, 1234000000, 1234560000]
 */
export const getCategoryNumbers = number => {
  if (number == null) return []
  const resultArr = [number]
  while (getParentNumber(number)) {
    const temp = getParentNumber(number)
    resultArr.unshift(temp)
    number = temp
  }
  return resultArr
}

/**
 * 函数节流
 * @param {fn} function test(){}
 * @return {fn} function test(){}
 */
export const throttle = (fn, wait = 100) => function func(...args) {
  if (fn.timer) return
  fn.timer = setTimeout(() => {
    fn.apply(this, args)
    fn.timer = null
  }, wait)
}
