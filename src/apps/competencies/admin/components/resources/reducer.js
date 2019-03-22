const INITIAL_STATE = {
  strategy: null,
  category: null,
  classification: null,
  competency: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      [action.key]: action.value
    }

  }

}

export default reducer
