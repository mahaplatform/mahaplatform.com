export const INITIAL_STATE = {
  error: null,
  message: null,
  mode: 'verify',
  notification_methods: null,
  show: false,
  status: 'pending',
  token: null,
  team: null,
  photo_id: null,
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
      mode: 'welcome',
      questions: action.result.data.questions,
      notification_methods: action.result.data.notification_methods,
      status: 'success',
      user: action.result.data.user
    }

  case 'PASSWORD_REQUEST':
  case 'SECURITY_REQUEST':
  case 'AVATAR_REQUEST':
  case 'NOTIFICATIONS_REQUEST':
    return {
      ...state,
      error: null,
      status: 'submitting'
    }

  case 'PASSWORD_FAILURE':
  case 'SECURITY_FAILURE':
  case 'AVATAR_FAILURE':
  case 'NOTIFICATIONS_FAILURE':
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
      photo_id: action.result.data.photo_id,
      status: 'success',
      mode: 'avatar'
    }

  case 'AVATAR_SUCCESS':
    return {
      ...state,
      mode: 'notifications'
    }

  case 'NOTIFICATIONS_SUCCESS':
    return {
      ...state,
      team: action.result.data.team,
      token: action.result.data.token,
      user: action.result.data.user,
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
