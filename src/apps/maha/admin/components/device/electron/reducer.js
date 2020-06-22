export const INITIAL_STATE = {
  progress: 0,
  status: 'pending',
  title: null,
  unseen: 0,
  update: null,
  verison: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET_PROGRESS':
    return {
      ...state,
      progress: action.progress,
      status: 'downloading'
    }

  case 'SET_TITLE':
    return {
      ...state,
      title: action.title
    }

  case 'SET_UPDATE':
    return {
      ...state,
      update: action.version,
      status: 'downloading'
    }

  case 'SET_UPDATE_READY':
    return {
      ...state,
      status: 'downloaded'
    }

  case 'SET_VERSION':
    return {
      ...state,
      verison: action.version
    }

  case 'UPDATE_UNSEEN':
    return {
      ...state,
      unseen: action.unseen
    }

  default:
    return state
  }

}
