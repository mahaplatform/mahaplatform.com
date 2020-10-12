const INITIAL_STATE = {
  account_status: 'pending',
  account: null,
  active: null,
  apps: [],
  devices: null,
  preferences: null,
  redirect: null,
  rights: null,
  session_status: 'pending',
  teams: [],
  teams_status: 'pending',
  team: null,
  user: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'LOAD_ACCOUNT_REQUEST':
    return {
      ...state,
      account_status: 'loading'
    }

  case 'LOAD_ACCOUNT_SUCCESS':
    return {
      ...state,
      ...action.value,
      account_status: 'success'
    }

  case 'LOAD_ACCOUNT_FAILURE':
    return {
      ...state,
      account_status: 'failure'
    }

  case 'FETCH_TEAMS_REQUEST':
    return {
      ...state,
      teams_status: 'loading'
    }

  case 'FETCH_TEAMS_SUCCESS':
    return {
      ...state,
      teams: action.result.data,
      teams_status: 'success'
    }

  case 'FETCH_TEAMS_FAILURE':
    return {
      ...state,
      teams_status: 'failure'
    }

  case 'FETCH_SESSION_REQUEST':
    return {
      ...state,
      session_status: 'loading'
    }

  case 'FETCH_SESSION_SUCCESS':
    return {
      ...state,
      session_status: 'success',
      active: action.active,
      ...action.result.data
    }

  case 'SIGNIN':
    return {
      ...state,
      account: action.account,
      active: action.active || state.active
    }

  case 'SIGNOUT_SUCCESS':
    return INITIAL_STATE

  case 'CHOOSE_TEAM':
    return {
      ...state,
      active: action.index,
      redirect: action.redirect
    }

  case 'SET_REDIRECT':
    return {
      ...state,
      redirect: action.redirect
    }

  default:
    return state
  }

}
