const INITIAL_STATE = {
  config: [
    { code: 'abc123', type: 'speak' },
    {
      type: 'question',
      options: [
        { value: 'yes', text: 'Yes', then: [
          { code: 'abc123', type: 'speak' },
          { code: 'mno123', type: 'property' },
          { code: 'bcd123', type: 'hangup' }
        ] },
        { value: 'no', text: 'No', then: [
          { code: 'abc123', type: 'speak' },
          { code: 'cde123', type: 'question', options: [
            { value: 1, text: 'One', then: [
              { code: 'def123', type: 'speak' },
              { code: 'mno123', type: 'list', action: 'add' },
              { code: 'ghi123', type: 'hangup' }
            ] },
            { value: 2, text: 'Two', then: [
              { code: 'hij123', type: 'ifelse', options: [
                { value: 1, text: 'One', then: [
                  { code: 'ijk123', type: 'speak' },
                  { code: 'mno123', type: 'workflow', action: 'remove' },
                  { code: 'jkl123', type: 'hangup' }
                ] },
                { value: 2, text: 'Two', then: [
                  { code: 'klm123', type: 'speak' },
                  { code: 'mno123', type: 'list', action: 'remove' },
                  { code: 'lmn123', type: 'hangup' }
                ] },
                { value: 3, text: 'Three', then: [
                  { code: 'mno123', type: 'speak' },
                  { code: 'mno123', type: 'interest', action: 'add' },
                  { code: 'nop123', type: 'hangup' }
                ] },
                { value: 4, text: 'Three', then: [
                  { code: 'mno123', type: 'speak' },
                  { code: 'mno123', type: 'email' },
                  { code: 'nop123', type: 'hangup' }
                ] },
                { value: 4, text: 'Three', then: [
                  { code: 'mno123', type: 'speak' },
                  { code: 'mno123', type: 'sms' },
                  { code: 'nop123', type: 'hangup' }
                ] }
              ] }
            ] },
            { value: 3, text: 'Three', then: [
              { code: 'opq123', type: 'speak' },
              { code: 'mno123', type: 'workflow', action: 'enroll' },
              { code: 'pqr123', type: 'hangup' }
            ] }
          ] }
        ] }
      ]
    }
  ]
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  default:
    return state
  }

}

export default reducer
