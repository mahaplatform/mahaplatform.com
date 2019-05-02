import '../web/maha/core/services/environment'
import glob from 'glob'
import path from 'path'
import Knex from 'knex'
import _ from 'lodash'

const [connection, protocol] = process.env.DATABASE_URL.match(/(.*):\/\/\/?(.*)/)

const knex = new Knex({
  client: protocol === 'postgres' ? 'postgresql' : protocol,
  connection,
  useNullAsDefault: true,
  pool: {
    min: 1,
    max: 1
  }
})

const bootstrapApps = async () => {

  const objects = glob.sync('apps/*/src/app.js').map(file => {
    return require(path.resolve(file)).default
  })

  const items = await knex('maha_apps')

  const addItems = objects.filter(object => {
    return object.code !== 'maha' && _.find(items, { code: object.code }) === undefined
  })

  await knex('maha_apps').insert(addItems.map(item => ({
    code: item.code
  })))

}

const bootstrapType = async (type, table) => {

  const objects = await collectObjects(`admin/${type}`)

  const items = await knex(table)

  const addItems = objects.filter(object => {
    return _.find(items, { code: object.code }) === undefined
  })

  await knex(table).insert(addItems.map(item => ({
    app_id: item.app_id,
    code: item.code
  })))

}

const collectObjects = async (pattern) => {

  const items = glob.sync(`apps/*/src/${pattern}.js`)

  return await Promise.reduce(items, async (objects, file) => {

    const [,appPath] = file.match(/web\/([^/]*)/)

    const config = require(path.resolve(`apps/${appPath}/src/app.js`)).default

    const app = await knex('maha_apps').where({
      code: config.code
    })

    return [
      ...objects,
      ...require(path.resolve(file)).default.map(item => ({
        ...item,
        app_id: app[0] ? app[0].id : null
      }))
    ]

  }, [])

}

const bootstrap = async () => {

  await bootstrapApps()

  await bootstrapType('alerts', 'maha_alerts')

  await bootstrapType('notifications', 'maha_notification_types')

  await bootstrapType('rights', 'maha_rights')

}

bootstrap().then(process.exit)
