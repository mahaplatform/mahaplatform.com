import _ from 'lodash'

const INITIAL_STATE = {
  active: {
    section: null,
    block: null
  },
  changes: 0,
  config: null,
  deviceIndex: 0,
  orientationIndex: 0,
  scaleIndex: 2
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHANGE_VIEWPORT':
    return {
      ...state,
      [`${action.key}Index`]: action.value
    }

  case 'ADD_SECTION':
    return {
      ...state,
      active: {
        section: null,
        block: null
      },
      changes: state.changes + 1,
      config: {
        ...state.config,
        sections: [
          ...state.config.sections,
          action.section
        ]
      }
    }

  case 'DELETE_SECTION':
    return {
      ...state,
      active: {
        section: null,
        block: null
      },
      changes: state.changes + 1,
      config: {
        ...state.config,
        sections: [
          ...state.config.sections.filter((section, index) => {
            return index !== action.index
          })
        ]
      }
    }

  case 'ADD':
    return {
      ...state,
      active: {
        section: action.section,
        block: state.config.sections[action.section].blocks.length
      },
      changes: state.changes + 1,
      config: {
        ...state.config,
        sections: [
          ...state.config.sections.map((section, i) => {
            if(i !== action.section) return section
            return {
              ...state.config.sections[i],
              blocks: [
                ...state.config.sections[i].blocks.reduce((blocks, block, index) => [
                  ...blocks,
                  ...(index === action.index) ? [action.block] : [],
                  block
                ], []),
                ...action.index === state.config.sections[i].blocks.length ? [action.block] : []
              ]
            }
          })
        ]
      }
    }

  case 'CLONE':
    return {
      ...state,
      active: {
        section: null,
        block: null
      },
      changes: state.changes + 1,
      config: {
        ...state.config,
        sections: [
          ...state.config.sections.map((section, i) => {
            if(i !== action.section) return section
            return {
              ...section,
              blocks: [
                ...state.config.sections[i].blocks,
                state.config.sections[i].blocks[action.block]
              ]
            }
          })
        ]
      }
    }

  case 'EDIT':
    return {
      ...state,
      changes: state.changes + 1,
      active: {
        section: action.section,
        block: action.block
      }
    }

  case 'REMOVE':
    return {
      ...state,
      active: {
        section: null,
        block: null
      },
      changes: state.changes + 1,
      config: {
        ...state.config,
        sections: [
          ...state.config.sections.map((section, i) => {
            if(i !== action.section) return section
            return {
              ...section,
              blocks: [
                ...state.config.sections[i].blocks.filter((block, j) => {
                  return j !== action.block
                })
              ]
            }
          })
        ]
      }
    }

  case 'UPDATE':
    return {
      ...state,
      changes: state.changes + 1,
      config: _.set(_.cloneDeep(state.config), action.key, action.value)
    }

  case 'SET':
    return {
      ...state,
      changes: 0,
      config: action.config
    }

  default:
    return state
  }

}

export default reducer
