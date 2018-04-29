import toArray from './to-array'

const removeRepeatsOfArray = arr => {
  const uniqs = arr
    .reduce(
      (acc, item) => (acc[item] = item, acc)
      , {})
  return toArray(uniqs)
}

export default removeRepeatsOfArray
