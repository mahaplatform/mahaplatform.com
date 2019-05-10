import { Segment } from '../../../../core/backframe'
import activate from './activate'
import assets from './assets'
import assignees from './assignees'
import attachments from './attachments'
import box from './sources/box'
import check from './sources/check'
import comments from './comments'
import devices from './devices'
import dropbox from './sources/dropbox'
import facebook from './sources/facebook'
import fields from './fields'
import google from './sources/google'
import microsoft from './sources/microsoft'
import help from './help'
import imports from './imports'
import importItems from './import_items'
import instagram from './sources/instagram'
import links from './links'
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
    assets,
    assignees,
    attachments,
    box,
    check,
    comments,
    devices,
    dropbox,
    facebook,
    fields,
    google,
    help,
    microsoft,
    imports,
    importItems,
    instagram,
    links,
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
    activate,
    signin,
    reset
  ]
})

export default api
