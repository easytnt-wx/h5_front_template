export function getColorMap() {
  const color = ['#1890ff', '#722ed1', '#13c2c2', '#52c41a', '#eb2f96', '#f5222d', '#fa8c16', '#fadb14', '#fa541c', '#2f54eb', '#a0d911', '#faad14']
  return color
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE() {
  const bw = window.navigator.userAgent
  const compare = s => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

export function parseQuery(str = location.search) {
  let qs = str.indexOf('?') === -1 ? str : str.split('?')[1]
  if (qs.length > 0) {
    let s,
      q = {},
      arr = []
    arr = qs.split('&')
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i]) continue
      s = arr[i].split('=')
      q[s[0]] = s[1]
    }
    return q
  } else {
    return {}
  }
}

// 根据指定个数分割数组
export function chunkArr(arr, size) {
  //判断如果不是数组(就没有length)，或者size没有传值，size小于1，就返回空数组
  if (!arr.length || !size || size < 1) return []
  let [start, end, result] = [null, null, []]
  for (let i = 0; i < Math.ceil(arr.length / size); i++) {
    start = i * size
    end = start + size
    result.push(arr.slice(start, end))
  }
  return result
}
