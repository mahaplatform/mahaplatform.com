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

export const toDisplay = (criteria, parent) => criteria.map((item, index) => ({
  ...item,
  index
})).filter(item => {
  return item.parent === parent
}).reduce((filters, item) => [
  ...filters,
  ..._.includes(['$and','$or'], item.operator) ? [{
    ...item,
    items: toDisplay(criteria, item.code)
  }] : [item]
], [])
