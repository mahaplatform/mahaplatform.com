import appConfig from './app_config'
import glob from 'glob'
import path from 'path'

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
