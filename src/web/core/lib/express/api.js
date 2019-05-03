import collectObjects from '../../utils/collect_objects'
import authenticator from '../backframe/authenticator'
import ownedByTeam from '../backframe/owned_by_team'
import ownedByUser from '../backframe/owned_by_user'
import authorizer from '../backframe/authorizer'
import activities from '../backframe/activities'
import listeners from '../backframe/listeners'
import notifier from '../backframe/notifier'
import auditor from '../backframe/auditor'
import emitter from '../backframe/emitter'
import redis from '../../services/redis'
import knex from '../../services/knex'
import App from '../../../apps/maha/models/app'
import { Segment } from '../../backframe'
import Backframe from '../../backframe'
import app from '../backframe/app'
import { Router } from 'express'

const _segment = async (portal, prefix, authenticated) => {

  const apiFiles = collectObjects(`${portal}/api.js`)

  return await Promise.mapSeries(apiFiles, async(apiFile) => {

    const api = apiFile.default

    const path = apiFile.config.path

    const app_id = await _getAppId(apiFile.config.code)

    return new Segment({
      path: `${prefix}${path}`,
      app_id,
      authenticated,
      ownedByTeam: authenticated,
      routes: [
        api
      ]
    })

  })

}

const _getAppId = async (code) => {

  const app = await App.where({ code }).fetch()

  return app ? app.get('id') : null

}


const mahaApi = async () => {

  const plugins = [
    authenticator,
    authorizer,
    app,
    ownedByTeam,
    ownedByUser,
    listeners,
    activities,
    auditor,
    emitter,
    notifier
  ]

  const adminSegment = await _segment('admin', '/admin', true)

  const adminApi = new Backframe({
    knex,
    redis,
    path: '/api',
    plugins,
    routes: adminSegment
  })

  const adminRoutes = adminApi.render()

  const publicSegment = await _segment('public', '', false)

  const publicApi = new Backframe({
    knex,
    redis,
    path: '/api',
    plugins,
    routes: publicSegment
  })

  const publicRoutes = publicApi.render()

  const router = new Router({ mergeParams: true })

  adminRoutes.map(route => router[route.method](route.path, route.handler))

  publicRoutes.map(route => router[route.method](route.path, route.handler))

  return router

}

export default mahaApi
