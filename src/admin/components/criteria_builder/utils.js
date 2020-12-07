import _ from 'lodash'

const traverse = (state, cindex, fn) => {
  if(cindex.length === 1) {
    return fn(state, cindex)
  } else if(_.isArray(state)) {
    return [
      ...state.map((item, sindex) => {
        if(sindex !== cindex[0]) return item
        return traverse(item, cindex.slice(1), fn)
      })
    ]
  } else {
    return {
      ...state,
      [cindex[0]]: traverse(state[cindex[0]], cindex.slice(1), fn)
    }
  }
}

export const create = (state, cindex, value) => {
  return traverse(state, cindex, (state, cindex) => ({
    ...state || {},
    [cindex[0]]: [
      ...state[cindex[0]],
      value
    ]
  }))
}

export const update = (state, cindex, value) => {
  return traverse(state, cindex, (state, cindex) => [
    ...state.map((item, index) => {
      return(index !== cindex[0]) ? item : value
    })
  ])
}

export const remove = (state, cindex) => {
  return traverse(state, cindex, (state, cindex) => [
    ...state.filter((item, index) => {
      return index !== cindex[0]
    })
  ])
}

export const toFilter = (items, parent = null) => {
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

export const toDisplay = (criteria, parent = null) => {
  return criteria.map((item, index) => ({
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
}
