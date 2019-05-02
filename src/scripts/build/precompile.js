import transpile from '../../web/maha/core/utils/transpile'
import glob from 'glob'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'

const apps = process.env.APPS.split(',')

const configs = apps.reduce((configs, app) => {

  const configPath = path.resolve('src', 'web', app, 'app.js')

  const contents = fs.readFileSync(configPath, 'utf8')

  const transpiled = transpile(contents)

  const config = eval(transpiled)

  return {
    ...configs,
    [app]: config
  }

}, {})

const collectObjects = (pattern) => [
  ...glob.sync(`apps/*/src/${pattern}`),
  ...glob.sync(`apps/*/src/${pattern}/index.js`)
]

const extract = (pattern, regex = null) => collectObjects(pattern).map(file => {

  const matches = regex ? file.match(regex) : file.match(/web\/([^/]*)/)

  return {
    ...configs[matches[1]],
    ...(regex) ? { name: _.camelCase(matches[2].replace('/',' ')) } : {},
    app: matches[1],
    filepath: path.resolve(file)
  }

})

const reducers = collectObjects('admin/components/**/reducer.js').map(file => {
  const matches = file.match(/(apps\/([^/]*)\/src\/admin\/components\/(.*))\/reducer.js/)
  return {
    ...configs[matches[2]],
    app: matches[2],
    name: _.camelCase(matches[3].replace('/',' ')),
    filepath: path.resolve(matches[1])
  }
})

const precompile = () => ({
  badges: extract('admin/badges.js'),
  roots: extract('admin/roots.js'),
  routes: extract('admin/routes.js'),
  reducers,
  styles: [
    { filepath: path.resolve('node_modules','reframe','src','style.less') },
    ...extract('admin/**/style.less')
  ],
  userTasks: extract('admin/user_tasks.js'),
  userFields: extract('admin/user_values.js'),
  userValues: extract('admin/user_values.js')
})

export default precompile
