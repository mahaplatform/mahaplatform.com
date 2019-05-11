import { Segment } from '../../../../core/backframe'
import box from './sources/box'
import check from './sources/check'
import comments from './comments'
import dropbox from './sources/dropbox'
import facebook from './sources/facebook'
import fields from './fields'
import google from './sources/google'
import microsoft from './sources/microsoft'
import imports from './imports'
import importItems from './import_items'
import instagram from './sources/instagram'
import notifications from './notifications'
import profiles from './profiles'
import sources from './sources'
import react from './react'
import reset from './reset'
import reviews from './reviews'
import searches from './searches'
import search from './search'
import security_questions from './security_questions'
import session from './session'
import sessions from './sessions'
import settings from './settings'
import signin from './signin'
import signout from './signout'
import stars from './stars'
import users from './users'

const authenticated = new Segment({
  authenticated: true,
  routes: [
    box,
    check,
    comments,
    dropbox,
    facebook,
    fields,
    google,
    microsoft,
    imports,
    importItems,
    instagram,
    notifications,
    reviews,
    sources,
    profiles,
    react,
    searches,
    search,
    security_questions,
    sessions,
    session,
    settings,
    signout,
    stars,
    users
  ]
})

const api = new Segment({
  routes: [
    authenticated,
    signin,
    reset
  ]
})

export default api
