export const INITIAL_STATE = {
  import: null,
  mapping: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'INIT':
    return {
      ...state,
      mapping: action.import.mapping,
      import: action.import
    }

  case 'UPDATE_MAPPING':
    return {
      ...state,
      mapping: [
        ...state.mapping.slice(0, action.index),
        action.mappingItem,
        ...state.mapping.slice(action.index + 1)
      ]
    }

  case 'UPDATE_IMPORT_REQUEST':
    return {
      ...state,
      mapping: action.request.params.mapping,
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

  default:
    return state

  }

}

export default reducer
