import path from 'path'
import _ from 'lodash'

export const configs = process.env.APPS.split(',').map(app => {
  const configPath = path.join(__dirname,'..','..','apps',app,'app.js')
  const config = require(configPath).default
  return {
    ...config,
    name: _.toLower(_.camelCase(config.title)),
    filepath: app
  }
})

const appConfig = (query) => _.find(configs, query)

export default appConfig
