import { Plugin, BackframeError } from '../../../backframe'
import getUserAccess from '../../../utils/get_user_access'
import Checkit from 'checkit'
import _ from 'lodash'

const loadAppsRights = async (options, req, trx) => {

  const access = await getUserAccess(req.user, trx)

  req.apps = access.apps

  req.rights = access.rights

  return req

}

const checkRules = async (options, req, trx) => {

  try {

    const rules = _.isFunction(options.rules) ? await options.rules(req, trx, options) : options.rules

    await Checkit(rules).run(req.body)

  } catch(err) {

    throw new BackframeError({
      code: 422,
      message: 'Unable to complete request',
      errors: err.toJSON()
    })

  }

  return req

}

const checkApp = async (options, req, trx) => {

  const app_ids = Object.keys(req.apps).reduce((ids, app) => [
    ...ids,
    req.apps[app].id
  ], [])

  const allowed = _.includes(app_ids, options.app_id)

  if(!allowed) {
    throw new BackframeError({
      code: 403,
      message: 'You do not have access to this app.'
    })
  }

  return req

}

const checkRights = async (options, req, trx) => {

  const rights = _.isPlainObject(options.rights) ? options.rights[options.action] : options.rights

  if(!rights) return req

  const allowed = rights.reduce((allowed, right) => {

    return allowed ? _.includes(req.rights, right) : false

  }, true)

  if(!allowed) {
    throw new BackframeError({
      code: 403,
      message: 'You do not have the rights to access this resource.'
    })
  }

  return req

}

const alterRequest = async (req, trx, options) => {

  if(options.rules) req = await checkRules(options, req, trx)

  if(!req.user) return req

  req = await loadAppsRights(options, req, trx)

  if(options.app_id) req = await checkApp(options, req, trx)

  if(options.rights) req = await checkRights(options, req, trx)

  return req

}

const authorizerPlugin = new Plugin({
  name: 'authorizer',
  alterRequest
})

export default authorizerPlugin
