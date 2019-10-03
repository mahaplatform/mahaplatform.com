import _ from 'lodash'

export const INITIAL_STATE = {
  query: '',
  chosen: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'LOAD_SUCCESS':
    return {
      ...state,
      chosen: action.result.data
    }

  case 'SET_CHOSEN':
    return {
      ...state,
      chosen: action.chosen
    }

  case 'SET_QUERY':
    return {
      ...state,
      query: action.query
    }

  case 'TOGGLE_RECORD':
    const getChosen = () => {
      if(!action.multiple) return [action.record]
      if(_.find(state.chosen, { id: action.record.id }) !== undefined) {
        return state.chosen.filter(record => record.id !== action.record.id)
      }
      return [
        ...state.chosen,
        action.record
      ]
    }

    return {
      ...state,
      chosen: getChosen()
    }

  default:
    return state
  }

}

export default reducer
