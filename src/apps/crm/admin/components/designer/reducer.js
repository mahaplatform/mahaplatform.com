import _ from 'lodash'

const INITIAL_STATE = {
  active: null,
  changes: 0,
  config: null,
  sidebar: true
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      active: action.index,
      changes: state.changes + 1,
      config: {
        ...state.config,
        blocks: [
          ...state.config.blocks.reduce((blocks, block, index) => [
            ...blocks,
            ...(index === action.index) ? [action.block] : [],
            block
          ], []),
          ...action.index === state.config.blocks.length ? [action.block] : []
        ]

      }
    }

  case 'CLONE':
    return {
      ...state,
      active: null,
      changes: state.changes + 1,
      config: {
        ...state.config,
        blocks: [
          ...state.config.blocks.reduce((blocks, block, index) => [
            ...blocks,
            ...(index === action.index) ? [block,block] : [block]
          ], [])
        ]
      }
    }

  case 'EDIT':
    return {
      ...state,
      changes: state.changes + 1,
      active: action.index
    }

  case 'REMOVE':
    return {
      ...state,
      active: null,
      changes: state.changes + 1,
      config: {
        ...state.config,
        blocks: [
          ...state.config.blocks.filter((block, index) => {
            return index !== action.index
          })
        ]
      }
    }

  case 'SET':
    return {
      ...state,
      changes: 0,
      config: action.config
    }

  case 'TOGGLE':
    return {
      ...state,
      sidebar: !state.sidebar
    }

  case 'UPDATE':
    return {
      ...state,
      changes: state.changes + 1,
      config: _.set(_.cloneDeep(state.config), action.key, action.value)
    }

  default:
    return state
  }

}

export default reducer
