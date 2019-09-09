import _ from 'lodash'

const INITIAL_STATE = {
  programs: null,
  consent: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      programs: action.result.data,
      status: 'success'
    }

  case 'SET':
    return {
      ...state,
      consent: action.consent
    }

  case 'TOGGLE':
    return {
      ...state,
      consent: [
        ...state.consent.map((consent, index) => {
          if(consent.program_id !== action.program_id) return consent
          return {
            ...consent,
            [action.key]: [
              ..._.xor(state.consent[index][action.key], [action.value])
            ]
          }
        })
      ]
    }

  default:
    return state
  }

}

export default reducer
