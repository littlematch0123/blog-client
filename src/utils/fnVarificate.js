// 检测是否为空
export const isEmpty = val => String(val).match(/^$/)

// 检测手机号
export const isPhoneNumber = val => !!String(val).match(/^(13\d|14[579]|15[0-35-9]|17[0135-8]|18\d)\d{8}$/)

// 检测一个汉字
export const isOneChineseCharacter = val => !!String(val).match(/^[\u4e00-\u9fa5]$/)

// 检测字符长度为1-20位
export const isLengthElt20 = val => !!String(val).match(/^.{1,20}$/)

// 检测是否为6位数字
export const isSixDigits = val => !!String(val).match(/^\d{6}$/)
