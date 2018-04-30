const removeValuesOfArray = (arr, _values) => {
  const values = Array.isArray(_values) ? _values : [_values]

  values.map(val => {
    const key = arr.indexOf(val)
    if (key >= 0) {
      delete arr[key]
    }
  })

  return arr.reduce(
    (acc, i) => (acc.push(i), acc), [])
}

export default removeValuesOfArray
