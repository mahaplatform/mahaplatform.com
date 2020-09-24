export const INITIAL_STATE = {
  account: null,
  error: null,
  message: null,
  mode: 'verify',
  notification_methods: null,
  show: false,
  status: 'pending',
  token: null,
  team: null,
  questions: null,
  question_id: null,
  user: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'VERIFY_REQUEST':
    return {
      ...state,
      error: null,
      status: 'submitting',
      token: action.request.params.token
    }

  case 'VERIFY_FAILURE':
    return {
      ...state,
      mode: 'invalid',
      status: 'failure',
      message: action.result.message
    }

  case 'VERIFY_SUCCESS':
    return {
      ...state,
      account: action.result.data.account,
      mode: 'welcome',
      questions: action.result.data.questions,
      notification_methods: action.result.data.notification_methods,
      status: 'success',
      team: action.result.data.team,
      user: action.result.data.user
    }

  case 'PASSWORD_REQUEST':
  case 'SECURITY_REQUEST':
  case 'AVATAR_REQUEST':
  case 'NOTIFICATIONS_REQUEST':
  case 'AUTHORIZE_CELL_REQUEST':
  case 'VERIFY_CELL_REQUEST':
    return {
      ...state,
      error: null,
      status: 'submitting'
    }

  case 'PASSWORD_FAILURE':
  case 'SECURITY_FAILURE':
  case 'AVATAR_FAILURE':
  case 'NOTIFICATIONS_FAILURE':
  case 'AUTHORIZE_CELL_FAILURE':
  case 'VERIFY_CELL_FAILURE':
    return {
      ...state,
      status: 'failure',
      error: action.result.message
    }

  case 'SECURITY_SUCCESS':
    return {
      ...state,
      status: 'success',
      mode: 'password'
    }

  case 'PASSWORD_SUCCESS':
    return {
      ...state,
      status: 'success'
    }

  case 'VERIFY_CELL_SUCCESS':
    return {
      ...state,
      status: 'success'
    }

  case 'AVATAR_SUCCESS':
    return {
      ...state,
      mode: 'notifications'
    }

  case 'NOTIFICATIONS_SUCCESS':
    return {
      ...state,
      account: action.result.data.account,
      mode: 'complete'
    }

  case 'CHANGE_MODE':
    return {
      ...state,
      mode: action.mode
    }

  case 'CHOOSE_QUESTION':
    return {
      ...state,
      mode: 'answer',
      question_id: action.id
    }

  case 'SET_PHOTO_ID':
    return {
      ...state,
      photo_id: action.id
    }

  case 'TOGGLE_PASSWORD':
    return {
      ...state,
      show: !state.show
    }

  default:
    return state
  }

}
