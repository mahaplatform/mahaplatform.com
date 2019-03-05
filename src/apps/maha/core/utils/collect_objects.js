import mahaRequire from './maha_require.js'
import appConfig from './app_config'
import glob from 'glob'

const collectObjects = (pattern) => [
  ...glob.sync(`src/apps/*/${pattern}`),
  ...glob.sync(`src/apps/*/${pattern}/index.js`)
].map(file => {

  const [,app] = file.match(/apps\/([^/]*)/)

  return {
    name: app,
    filepath: file.replace('/index.js', ''),
    default: mahaRequire(file).default,
    config: appConfig({ filepath: app })
  }

})

export default collectObjects
