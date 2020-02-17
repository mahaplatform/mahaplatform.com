import _ from 'lodash'

export const toFilter = (items, parent) => {
  const result = items.filter(item => {
    return item.parent === parent
  }).map(item => ({
    ..._.includes(['$and','$or'], item.operator) ? {
      [item.operator]: toFilter(items, item.code)
    } : {
      [item.field]: {
        [item.operator]: item.value
      }
    }
  }))
  return parent ? result : result[0]
}
