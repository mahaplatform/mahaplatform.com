import knex from '../../services/knex'
import pluralize from 'pluralize'
import log from '../../utils/log'
import glob from 'glob'
import path from 'path'
import _ from 'lodash'

const root = path.resolve(__dirname,'..','..','..','apps')

const bootstrapApps = async () => {

  const objects = glob.sync(`${root}/*/app.js`).map(file => {
    return require(path.resolve(file)).default
  })

  const items = await knex('maha_apps')

  const addItems = objects.filter(object => object.code !== 'maha' && _.find(items, {
    code: object.code
  }) === undefined)

  await Promise.map(addItems, async (item) => {

    log('info', 'bootstrap', `Adding app ${item.code}`)

    await knex('maha_apps').insert({
      code: item.code
    })

  })

}

export const bootstrapType = async (type, pattern, table, relateds = []) => {

  const objects = await collectObjects(`admin/${pattern}`)

  const items = await knex(table)

  const addItems = objects.filter(object => {
    return _.find(items, { code: object.code }) === undefined
  })

  const removeItems = items.filter(item => {
    return _.find(objects, { code: item.code }) === undefined
  })

  const added = await Promise.map(addItems, async (item) => {

    log('info', 'bootstrap', `Adding ${pluralize.singular(type)} ${item.code}`)

    const record = await knex(table).insert({
      app_id: item.app_id,
      code: item.code
    }).returning('*')

    return record[0]

  })

  const removed = await Promise.map(removeItems, async (item) => {

    log('info', 'bootstrap', `Removing ${pluralize.singular(type)} ${item.code}`)

    await Promise.mapSeries(relateds, async(related) => {
      await knex(related.table).where(related.key, item.id).del()
    })

    await knex(table).where('id', item.id).del()

    return item.id

  })

  return { added, removed }

}

const collectObjects = async (pattern) => {

  const items = glob.sync(`${root}/*/${pattern}`)

  return await Promise.reduce(items, async (objects, file) => {

    const [,appPath] = file.match(/apps\/([^/]*)/)

    const config = require(path.join(root,appPath,'app.js')).default

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


export const bootstrap = async () => {

  await bootstrapApps()

  await bootstrapType('notifications', 'notifications.js', 'maha_notification_types', [
    { table: 'maha_users_notification_types', key: 'notification_type_id' }
  ])

  const admins = await knex('maha_roles').where('type', 'admin')

  const rights = await bootstrapType('rights', 'rights.js', 'maha_rights', [
    { table: 'maha_roles_rights', key: 'right_id' }
  ])

  await Promise.mapSeries(rights.added, async (right) => {
    await Promise.mapSeries(admins, async (role) => {
      await knex('maha_roles_rights').insert({
        role_id: role.id,
        right_id: right.id
      })
    })
  })

  await bootstrapType('dashboard', 'dashboard/index.js', 'maha_dashboard_card_types', [
    { table: 'maha_dashboard_cards', key: 'type_id' }
  ])

}
