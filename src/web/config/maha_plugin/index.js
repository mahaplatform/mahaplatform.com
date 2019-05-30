import transpile from '../../core/utils/transpile'
import apps from '../../core/utils/apps'
import log from '../../core/utils/log'
import glob from 'glob'
import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'
import fs from 'fs'

const configs = apps.reduce((configs, app) => {
  const configPath = path.join('src','web','apps',app,'app.js')
  const contents = fs.readFileSync(configPath, 'utf8')
  const transpiled = transpile(contents)
  const config = eval(transpiled)
  return {
    ...configs,
    [app]: config
  }
}, {})

const collectObjects = (pattern) => [
  ...glob.sync(`src/web/core/${pattern}`),
  ...glob.sync(`src/web/core/${pattern}/index.js`),
  ...glob.sync(`src/web/apps/*/${pattern}`),
  ...glob.sync(`src/web/apps/*/${pattern}/index.js`)
]

const extract = (pattern) => collectObjects(pattern).map(file => {
  const appMatches = file.match(/src\/web\/apps\/(([^/]*).*)/)
  if(appMatches) return {
    ...configs[appMatches[2]],
    name: _.camelCase(appMatches[1].replace('/',' ')),
    filepath: `../../apps/${appMatches[1]}`
  }
  const matches = file.match(/src\/web\/core\/admin\/(([^/]*).*)/)
  return {
    code: 'admin',
    name: _.camelCase(matches[1].replace('/',' ')),
    filepath: `./${matches[1]}`
  }
})

const reducers = (pattern) => collectObjects('admin/**/reducer.js').map(file => {
  const appMatches = file.match(/src\/web\/apps\/(([^/]*)\/admin\/(.*)\/(.*))\/reducer.js/)
  if(appMatches) return {
    ...configs[appMatches[2]],
    name: _.camelCase(appMatches[4].replace('/',' ')),
    filepath: `../../apps/${appMatches[1]}`
  }
  const matches = file.match(/src\/web\/core\/admin\/(([^/]*)\/(.*))\/reducer.js/)
  return {
    code: 'admin',
    name: _.camelCase(matches[3].replace('/',' ')),
    filepath: `./${matches[1]}`
  }
})

const renderTemplate = (templateName, variables) => {
  const template = fs.readFileSync(path.join(__dirname, `${templateName}.ejs`), 'utf8')
  const data = ejs.render(template, variables)
  fs.writeFileSync(path.join(__dirname,'..','..','core','admin',templateName), data, 'utf8')
}

class MahaWebpackPlugin {

  constructor(root) {
    this.root = root
  }

  apply(compiler) {

    const create = (file) => {

      if(file === '/tmp/client.js') return
      if(file) log('info', 'dev', `Detected change in ${file.replace(path.resolve(), '')}`)
      if(file) log('info', 'dev', 'Recompiling client')
      if(!file) log('info', 'dev', 'Compiling client')

      const variables = {
        badges: extract('admin/badges/index.js'),
        roots: extract('admin/roots/index.js'),
        routes: extract('admin/views/index.js'),
        reducers: reducers('admin/**/reducer.js'),
        styles: extract('admin/**/style.less'),
        settings: extract('admin/settings.js'),
        userTasks: extract('admin/user_tasks.js'),
        userFields: extract('admin/user_fields.js'),
        userValues: extract('admin/user_values.js')
      }

      renderTemplate('app.js', variables)

      renderTemplate('index.less', variables)

    }

    const done = () => log('info', 'dev', 'Finished compiling client')

    compiler.hooks.afterEnvironment.tap('MahaWebpackPlugin', create)

    compiler.hooks.invalid.tap('MahaWebpackPlugin', create)

    compiler.hooks.done.tap('MahaWebpackPlugin', done)
  }

}

export default MahaWebpackPlugin
