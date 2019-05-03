import _ from 'lodash'

const INITIAL_STATE = {
  reactions: {}
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'UPDATE':
    return {
      ...state,
      reactions: {
        ...state.reactions,
        [action.table]: {
          ...state.reactions[action.table] || {},
          [action.id]: action.reactions
        }
      }
    }

  case 'REACT':
    const reactions = _.get(state.reactions, `${action.table}[${action.id}]`)
    const exists = _.find(reactions, { id: action.reaction.id, type: action.reaction.type }) !== undefined
    return {
      ...state,
      reactions: {
        ...state.reactions,
        [action.table]: {
          ...state.reactions[action.table] || {},
          [action.id]: [
            ...(reactions || []).filter(reaction => {
              return reaction.id !== action.reaction.id || reaction.type !== action.reaction.type
            }),
            ...!exists ? [action.reaction] : []
          ]
        }
      }
    }

  case 'UNREACT':
    return {
      ...state,
      reactions: {
        ...state.reactions,
        [action.table]: {
          ...state.reactions[action.table] || {},
          [action.id]: [
            ...(_.get(state.reactions, `${action.table}[${action.id}]`) || []).filter(reaction => {
              return reaction.id !== action.reaction.id || reaction.type !== action.reaction.type
            })
          ]
        }
      }
    }

  default:
    return state

  }

}

export default reducer
