export const INITIAL_STATE = {
  import: null,
  name: null,
  strategy: 'ignore'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'INIT':
    return {
      ...state,
      import: action.import
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
      name: action.name,
      strategy: action.strategy,
      status: 'saved'
    }

  case 'UPDATE_NAME':
    return {
      ...state,
      name: action.name
    }

  case 'UPDATE_STRATEGY':
    return {
      ...state,
      strategy: action.strategy
    }

  default:
    return state

  }

}

export default reducer
