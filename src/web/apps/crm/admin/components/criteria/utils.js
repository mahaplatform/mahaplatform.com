import _ from 'lodash'

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
