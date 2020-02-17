import _ from 'lodash'

export const toCriteria = (items, parent) => {
  const result = items.filter(item => {
    return item.parent === parent
  }).map(item => ({
    ..._.includes(['$and','$or'], item.operator) ? {
      [item.operator]: toCriteria(items, item.code)
    } : {
      [item.field]: {
        [item.operator]: item.value
      }
    }
  }))
  return parent ? result : result[0]
}
