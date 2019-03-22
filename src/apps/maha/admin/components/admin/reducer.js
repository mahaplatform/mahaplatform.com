import _ from 'lodash'

const INITIAL_STATE = {
  active: null,
  apps: [],
  devices: null,
  preferences: null,
  rights: null,
  session: null,
  status: 'pending',
  teams: [],
  team: null,
  user: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'LOAD_ADMIN_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'LOAD_ADMIN_SUCCESS':
    return {
      ...state,
      ...action.value,
      status: 'loaded'
    }

  case 'LOAD_ADMIN_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  case 'LOAD_SESSION_SUCCESS':
    return {
      ...state,
      teams: [
        ...state.teams.map((team, index) => {
          if(index !== state.active) return team
          return {
            ...state.teams[state.active],
            ...action.result.data.team,
            user: action.result.data.user
          }
        })
      ],
      ...action.result.data
    }

  case 'ADD_TEAM':
    const team = {
      ...action.team,
      token: action.token,
      user: action.user
    }
    return {
      ...state,
      active: state.teams ? state.teams.length : 0,
      teams: [
        ...state.teams,
        team
      ],
      team
    }

  case 'REMOVE_TEAM':
    return {
      ...state,
      active: state.active !== action.index ? state.active : null,
      apps: state.active !== action.index ? state.apps : null,
      devices: state.active !== action.index ? state.devices : null,
      preferences: state.active !== action.index ? state.preferences : null,
      rights: state.active !== action.index ? state.rights : null,
      session: state.active !== action.index ? state.session : null,
      teams: state.teams.filter((team, index) => index !== action.index),
      team: state.active !== action.index ? state.team : null,
      user: state.active !== action.index ? state.user : null
    }

  case 'REMOVE_ALL_TEAMS':
    return {
      ...state,
      devices: null,
      preferences: null,
      rights: null,
      session: null,
      teams: [],
      team: null,
      user: null
    }

  case 'SIGNIN':
    return {
      ...state,
      active: action.index,
      teams: [
        ...state.teams.map((team, index) => {
          if(index !== action.index) return team
          return {
            ...team,
            token: action.token
          }
        })
      ]
    }

  case 'SIGNOUT_SUCCESS':
    return {
      ...state,
      active: null,
      apps: null,
      devices: null,
      preferences: null,
      rights: null,
      session: null,
      teams: [
        ...state.teams.map((team, index) => {
          if(index !== state.active) return team
          return _.omit(team, ['token'])
        })
      ],
      team: null,
      user: null
    }

  case 'CHOOSE_TEAM':
    return {
      ...state,
      active: action.index
    }

  case 'REMOVE_SESSION':
    return {
      ...state,
      apps: null,
      devices: null,
      preferences: null,
      rights: null,
      session: null,
      team: null,
      user: null
    }

  case 'UPDATE_SESSION':
    return {
      ...state,
      ...action.session
    }

  default:
    return state
  }

}
