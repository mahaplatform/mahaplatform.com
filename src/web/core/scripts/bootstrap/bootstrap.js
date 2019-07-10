import knex from '../../services/knex'
import glob from 'glob'
import path from 'path'
import _ from 'lodash'

export const bootstrapApps = async () => {

  const objects = glob.sync('src/web/apps/*/app.js').map(file => {
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

export const bootstrapType = async (type, table) => {

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

  const items = glob.sync(`src/web/apps/*/${pattern}.js`)

  return await Promise.reduce(items, async (objects, file) => {

    const [,appPath] = file.match(/src\/web\/apps\/([^/]*)/)

    const config = require(path.resolve(`src/web/apps/${appPath}/app.js`)).default

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
