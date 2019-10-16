const INITIAL_STATE = {
  steps: [
    { id: 1, code: 'abc123', type: 'speak', delta: 0, parent_id: null, answer_value: null, config: { action: 'play' } },
    { id: 2, code: 'bcd123', type: 'question', delta: 1, parent_id: null, answer_value: null, config: { options: [{ value: 1, text: 1 }, { value: 2, text: 2 }] } },
    { id: 3, code: 'cde123', type: 'answer', delta: 0, parent_id: 2, answer_value: 1, config: {} },
    { id: 4, code: 'cde123', type: 'answer', delta: 0, parent_id: 2, answer_value: 2, config: {} },
    { id: 5, code: 'cde123', type: 'speak', delta: 0, parent_id: 3, answer_value: null, config: { action: 'say' } },
    { id: 6, code: 'def123', type: 'action', delta: 1, parent_id: 3, answer_value: null, config: { action: 'update_property' } },
    { id: 7, code: 'fgh123', type: 'speak', delta: 0, parent_id: 4, answer_value: null, config: { action: 'say' } },
    { id: 8, code: 'ghi123', type: 'action', delta: 1, parent_id: 4, answer_value: null, config: { action: 'add_to_list' } },
    { id: 9, code: 'ghi123', type: 'action', delta: 2, parent_id: 4, answer_value: null, config: { action: 'send_email' } },
    { id: 10, code: 'hij123', type: 'goal', delta: 3, parent_id: 4, answer_value: null, config: {} }
  ]
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  default:
    return state
  }

}

export default reducer
