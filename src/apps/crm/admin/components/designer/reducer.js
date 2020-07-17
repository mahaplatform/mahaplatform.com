import _ from 'lodash'

const INITIAL_STATE = {
  active: {
    section: null,
    index: null
  },
  changes: 0,
  config: null,
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
        index: null
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

  case 'MOVE':
    return {
      ...state,
      active: {
        section: null,
        index: null
      },
      changes: state.changes + 1,
      config: {
        ...state.config,
        ...action.from.section === action.to.section ? {
          [action.from.section]: {
            ...state.config[action.from.section],
            blocks: (action.from.index < action.to.index) ? [
              ...state.config[action.from.section].blocks.slice(0, action.from.index),
              ...state.config[action.from.section].blocks.slice(action.from.index + 1, action.to.index + 1),
              state.config[action.from.section].blocks[action.from.index],
              ...state.config[action.from.section].blocks.slice(action.to.index + 1)
            ] : [
              ...state.config[action.from.section].blocks.slice(0, action.to.index),
              state.config[action.from.section].blocks[action.from.index],
              ...state.config[action.from.section].blocks.slice(action.to.index, action.from.index),
              ...state.config[action.from.section].blocks.slice(action.from.index + 1)
            ]
          }
        } : {}
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
