import glob from 'glob'
import path from 'path'
import _ from 'lodash'

const configs = process.env.APPS.split(',').map(app => {
  const configPath = path.join(__dirname,'..','..','apps',app,'app.js')
  const config = require(configPath).default
  return {
    ...config,
    name: _.toLower(_.camelCase(config.title)),
    filepath: app
  }
})

const appConfig = (query) => _.find(configs, query)

const root = path.join(__dirname,'..','..','apps')

const collectObjects = (pattern) => [
  ...glob.sync(`${root}/*/${pattern}`),
  ...glob.sync(`${root}/*/${pattern}/index.js`)
].map(file => {

  const [,app] = file.match(/apps\/([^/]*)/)

  return {
    name: app,
    filepath: file.replace('/index.js', ''),
    default: require(file).default,
    config: appConfig({ filepath: app })
  }

})

export default collectObjects
