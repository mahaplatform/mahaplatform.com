import apps from './apps'
import glob from 'glob'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'

const root = path.join(__dirname,'..','..','apps')

const configs = apps.map(app => {
  const configPath = path.join(root,app,'app.js')
  const config = require(configPath).default
  return {
    ...config,
    name: _.toLower(_.camelCase(config.title)),
    filepath: app
  }
})

const appConfig = (query) => _.find(configs, query)

const getContent = (filename) => {
  const ext = path.extname(filename)
  if(ext === '.json') {
    return { content: fs.readFileSync(filename, 'utf8') }
  }
  return { default: require(filename).default }
}

const collectObjects = (pattern) => [
  ...glob.sync(`${root}/*/${pattern}`),
  ...glob.sync(`${root}/*/${pattern}/index.js`)
].filter(file => {
  return file.match(/_test.js$/) === null && file.match(/.map$/) === null
}).map(file => {

  const [,app] = file.match(/apps\/([^/]*)/)

  return {
    name: app,
    filepath: file.replace('/index.js', ''),
    filename: path.basename(file),
    config: appConfig({ filepath: app }),
    ...getContent(file)
  }

})

export default collectObjects
