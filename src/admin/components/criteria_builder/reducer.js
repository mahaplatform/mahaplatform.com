import _ from 'lodash'

const INITIAL_STATE = {
  items: [
    { code: _.random(100000, 999999).toString(36), parent: null, field: null, operator: '$and', value: null, data: null }
  ],
  test: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CREATE':
    return {
      ...state,
      items: [
        ...state.items,
        action.item
      ],
      test: null
    }

  case 'REMOVE':
    return {
      ...state,
      items: [
        ...state.items.filter((item, index) => {
          return index !== action.index
        })
      ]
    }

  case 'RESET':
    return {
      ...state,
      test: null
    }

  case 'SET':
    return {
      ...state,
      items: action.items
    }

  case 'TEST':
    return {
      ...state,
      test: action.item !== null ? [
        ...state.items.filter(item => {
          return item.code !== action.item.code
        }),
        action.item
      ] : state.items
    }

  default:
    return state
  }

}

export default reducer
