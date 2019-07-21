import knex from '../../services/knex'
import pluralize from 'pluralize'
import log from '../../utils/log'
import glob from 'glob'
import path from 'path'
import _ from 'lodash'

const root = path.resolve(__dirname,'..','..','..','apps')

export const bootstrapApps = async () => {

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

export const bootstrapType = async (type, table) => {

  const objects = await collectObjects(`admin/${type}`)

  const items = await knex(table)

  const addItems = objects.filter(object => {
    return _.find(items, { code: object.code }) === undefined
  })

  await Promise.map(addItems, async (item) => {

    log('info', 'bootstrap', `Adding ${pluralize.singular(type)} ${item.code}`)

    await knex(table).insert({
      app_id: item.app_id,
      code: item.code
    })

  })

}

const collectObjects = async (pattern) => {

  const items = glob.sync(`${root}/*/${pattern}.js`)

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
