import { Segment } from '../../../../core/backframe'
import comments from './comments'
import fields from './fields'
import imports from './imports'
import importItems from './import_items'
import react from './react'
import reset from './reset'
import reviews from './reviews'
import searches from './searches'
import search from './search'
import settings from './settings'
import signin from './signin'

const authenticated = new Segment({
  authenticated: true,
  routes: [
    comments,
    fields,
    imports,
    importItems,
    reviews,
    react,
    searches,
    search,
    settings
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
