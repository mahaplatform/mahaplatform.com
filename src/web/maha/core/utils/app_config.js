import mahaRequire from './maha_require.js'
import _ from 'lodash'

export const configs = process.env.APPS.split(',').map(app => {
  const config = mahaRequire(`src/web/${app}/app.js`).default
  return {
    ...config,
    name: _.toLower(_.camelCase(config.title)),
    filepath: app
  }

})

const appConfig = (query) => _.find(configs, query)

export default appConfig
