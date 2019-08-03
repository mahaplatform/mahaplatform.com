import _ from 'lodash'

export const add = (state, cindex, value) => {}

export const update = (state, cindex, value) => {
  return traverse(state, cindex, (state, cindex) => {
    return state.map((item, index) => {
      if(index !== cindex[0]) return item
      return value
    })
  })
}

export const remove = (state, cindex) => {
  return traverse(state, cindex, (state, cindex) => {
    return state.filter((item, index) => {
      return index !== cindex[0]
    })
  })
}

const traverse = (state, cindex, fn) => {
  if(cindex.length === 1) {
    return [
      ...fn(state, cindex)
    ]
  } else if(_.isArray(state)) {
    return [
      ...state.map((item, sindex) => {
        if(sindex !== cindex[0]) return item
        return remove(item, cindex.slice(1))
      })
    ]
  } else {
    return {
      ...state,
      [cindex[0]]: remove(state[cindex[0]], cindex.slice(1))
    }
  }
}
