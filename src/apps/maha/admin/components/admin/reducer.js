const INITIAL_STATE = {
  account_status: 'pending',
  account: null,
  active_status: 'pending',
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
      account: action.value ? action.value.account : null,
      account_status: 'loaded'
    }

  case 'LOAD_ACCOUNT_FAILURE':
    return {
      ...state,
      account_status: 'failure'
    }

  case 'LOAD_ACTIVE_REQUEST':
    return {
      ...state,
      active_status: 'loading'
    }

  case 'LOAD_ACTIVE_SUCCESS':
    return {
      ...state,
      active: action.value,
      active_status: 'loaded'
    }

  case 'LOAD_ACTIVE_FAILURE':
    return {
      ...state,
      active_status: 'failure'
    }

  case 'FETCH_ACCOUNT_REQUEST':
    return {
      ...state,
      account_status: 'loading'
    }

  case 'FETCH_ACCOUNT_SUCCESS':
    return {
      ...state,
      account: action.result.data,
      account_status: 'success'
    }

  case 'FETCH_ACCOUNT_FAILURE':
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
      account_status: 'authenticated',
      account: action.account,
      active: action.active || state.active
    }

  case 'SIGNOUT_SUCCESS':
    return {
      ...INITIAL_STATE,
      active: state.active
    }

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
