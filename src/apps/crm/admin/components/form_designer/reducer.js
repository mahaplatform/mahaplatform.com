import _ from 'lodash'

const INITIAL_STATE = {
  active: null,
  changes: 0,
  config: null,
  status: 'ready'
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
            ...(index === action.index) ? [
              field,
              {
                ...field,
                code: action.code
              }
            ] : [field]
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
