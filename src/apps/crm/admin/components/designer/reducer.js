import _ from 'lodash'

const INITIAL_STATE = {
  active: {
    section: null,
    index: null
  },
  changes: 0,
  config: null,
  sidebar: true,
  status: 'ready'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      active: {
        section: action.section,
        index: action.index
      },
      changes: state.changes + 1,
      config: {
        ...state.config,
        [action.section]: {
          ...state.config[action.section],
          blocks: [
            ...state.config[action.section].blocks.reduce((blocks, block, index) => [
              ...blocks,
              ...(index === action.index) ? [action.block] : [],
              block
            ], []),
            ...action.index === state.config[action.section].blocks.length ? [action.block] : []
          ]
        }
      }
    }

  case 'CLONE':
    return {
      ...state,
      active: {
        section: null,
        index: null,
      },
      changes: state.changes + 1,
      config: {
        ...state.config,
        [action.section]: {
          ...state.config[action.section],
          blocks: [
            ...state.config[action.section].blocks.reduce((blocks, block, index) => [
              ...blocks,
              ...(index === action.index) ? [block,block] : [block]
            ], [])
          ]
        }
      }
    }

  case 'EDIT':
    return {
      ...state,
      active: {
        section: action.section,
        index: action.index
      }
    }

  case 'REMOVE':
    return {
      ...state,
      active: {
        section: null,
        index: null
      },
      changes: state.changes + 1,
      config: {
        ...state.config,
        [action.section]: {
          ...state.config[action.section],
          blocks: [
            ...state.config[action.section].blocks.filter((block, index) => {
              return index !== action.index
            })
          ]
        }
      }
    }

  case 'SAVE_REQUEST':
    return {
      ...state,
      status: 'saving'
    }

  case 'SAVE_SUCCESS':
    return {
      ...state,
      status: 'ready',
      changes: 0
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
