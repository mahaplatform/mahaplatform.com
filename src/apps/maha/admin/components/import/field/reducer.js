export const INITIAL_STATE = {
  status: 'pending',
  config: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET_CONFIG':
    return {
      ...state,
      status:'ready',
      config: action.config
    }

  case 'UPDATE_CONFIG':
    return {
      ...state,
      config: {
        ...state.config,
        ...action.config
      }
    }

  case 'PREVIEW_FIELDS_SUCCESS':
    return {
      ...state,
      table_fields: action.result.data
    }

  case 'PREVIEW_RELATIONCOLUMN_SUCCESS':
    return {
      ...state,
      relation_columns: action.result.data
    }

  default:
    return state

  }
}
