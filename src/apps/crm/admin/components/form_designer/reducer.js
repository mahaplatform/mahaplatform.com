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
          ...action.index === state.config.fields.length ? [action.block] : []
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

  default:
    return state
  }

}

export default reducer
