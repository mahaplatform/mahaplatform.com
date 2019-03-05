export const INITIAL_STATE = {
  delimiter: ',',
  headers: true,
  index: 0,
  parsed: null,
  status: 'pending',
  import: null,
  table_fields: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'INIT':
    return {
      ...state,
      import: action.import
    }

  case 'PREVIEW_DATA_REQUEST':
    return {
      ...state,
      delimiter: action.request.params.delimiter,
      headers: action.request.params.headers,
      quote: action.request.params.quote,
      status: 'loading'
    }

  case 'PREVIEW_DATA_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  case 'PREVIEW_DATA_SUCCESS':
    return {
      ...state,
      parsed: action.result.data,
      status: 'loaded',
      index: 0
    }

  case 'PREVIOUS':
    return {
      ...state,
      index: state.index > 0 ? state.index - 1 : 0
    }

  case 'NEXT':
    return {
      ...state,
      index: state.index < state.parsed.rows.length - 1 ? state.index + 1 : state.index
    }

  case 'UPDATE_IMPORT_REQUEST':
    return {
      ...state,
      status: 'saving'
    }

  case 'UPDATE_IMPORT_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  case 'UPDATE_IMPORT_SUCCESS':
    return {
      ...state,
      import: action.result.data,
      status: 'saved'
    }

  case 'PREVIEW_FIELDS_SUCCESS':
    return {
      ...state,
      table_fields: action.result.data
    }

  case 'PREVIEW_TABLES_SUCCESS':
    return {
      ...state,
      tables: action.result.data
    }

  default:
    return state

  }

}

export default reducer
