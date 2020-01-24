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
        fields: [
          ...state.config.fields.reduce((fields, field, index) => [
            ...fields,
            ...(index === action.index) ? [action.field] : [],
            field
          ], []),
          ...action.index === state.config.fields.length ? [action.field] : []
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
        fields: [
          ...state.config.fields.reduce((fields, field, index) => [
            ...fields,
            ...(index === action.block) ? [field,field] : [field]
          ], [])
        ]
      }
    }

  case 'EDIT':
    return {
      ...state,
      changes: state.changes + 1,
      active: action.field
    }

  case 'REMOVE':
    return {
      ...state,
      active: null,
      changes: state.changes + 1,
      config: {
        ...state.config,
        fields: [
          ...state.config.fields.filter((field, index) => {
            return index !== action.field
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
