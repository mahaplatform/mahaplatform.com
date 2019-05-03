import { Segment } from '../../../core/backframe'
import account from './api/account'
import account_notifications from './api/account_notifications'
import account_security from './api/account_security'
import activate from './api/activate'
import assets from './api/assets'
import assignees from './api/assignees'
import attachments from './api/attachments'
import box from './api/sources/box'
import check from './api/sources/check'
import comments from './api/comments'
import devices from './api/devices'
import dropbox from './api/sources/dropbox'
import facebook from './api/sources/facebook'
import fields from './api/fields'
import google from './api/sources/google'
import microsoft from './api/sources/microsoft'
import help from './api/help'
import imports from './api/imports'
import importItems from './api/import_items'
import instagram from './api/sources/instagram'
import links from './api/links'
import notifications from './api/notifications'
import profiles from './api/profiles'
import sources from './api/sources'
import react from './api/react'
import reset from './api/reset'
import reviews from './api/reviews'
import searches from './api/searches'
import search from './api/search'
import security_questions from './api/security_questions'
import session from './api/session'
import sessions from './api/sessions'
import settings from './api/settings'
import signin from './api/signin'
import signout from './api/signout'
import stars from './api/stars'
import users from './api/users'

const authenticated = new Segment({
  authenticated: true,
  routes: [
    account,
    account_notifications,
    account_security,
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
