export const INITIAL_STATE = {
  import: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'INIT':

    return {
      ...state,
      import: action.import
    }

  default:
    return state

  }

}

export default reducer
