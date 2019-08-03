const INITIAL_STATE = {
  criteria: {
    $and: [
      { field: 'email', operator: '$ct', value: 'cornell.edu' },
      { field: 'first_name', operator: '$eq', value: 'Greg' }
    ]
  }
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  default:
    return state
  }

}

export default reducer
