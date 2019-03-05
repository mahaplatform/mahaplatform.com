import transpile from '../../../utils/transpile'
import { info } from '../../../utils/console'
import glob from 'glob'
import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'
import fs from 'fs'

const apps = process.env.APPS.split(',')

const configs = apps.reduce((configs, app) => {

  const configPath = path.resolve('src', 'apps', app, 'app.js')

  const contents = fs.readFileSync(configPath, 'utf8')

  const transpiled = transpile(contents)

  const config = eval(transpiled)

  return {
    ...configs,
    [app]: config
  }

}, {})

const collectObjects = (pattern) => [
  ...glob.sync(`src/apps/*/${pattern}`),
  ...glob.sync(`src/apps/*/${pattern}/index.js`)
]

const extract = (pattern, regex = null) => collectObjects(pattern).map(file => {

  const matches = regex ? file.match(regex) : file.match(/apps\/([^/]*)/)

  return {
    ...configs[matches[1]],
    ...(regex) ? { name: _.camelCase(matches[2].replace('/',' ')) } : {},
    app: matches[1],
    filepath: path.resolve(file)
  }

})

const templatePath = path.resolve(__dirname)

const renderTemplate = (templateName, variables) => {

  const template = fs.readFileSync(path.join(templatePath, `${templateName}.ejs`), 'utf8')

  const data = ejs.render(template, variables)

  fs.writeFileSync(path.resolve('tmp', templateName), data, 'utf8')

}

class MahaWebpackPlugin {

  constructor(root) {
    this.root = root
  }

  apply(compiler) {

    const create = (file) => {

      if(file === '/tmp/client.js') return
      if(file) info('DEV', `Detected change in ${file.replace(path.resolve(), '')}`)
      if(file) info('DEV', 'Recompiling client')
      if(!file) info('DEV', 'Compiling client')

      const reducers = collectObjects('admin/**/reducer.js').map(file => {
        const matches = file.match(/(src\/apps\/([^/]*)\/admin\/(.*)\/(.*))\/reducer.js/)
        return {
          ...configs[matches[2]],
          app: matches[2],
          name: _.camelCase(matches[4].replace('/',' ')),
          filepath: path.resolve(matches[1])
        }
      })

      const variables = {
        badges: extract('admin/badges.js'),
        roots: extract('admin/roots.js'),
        routes: extract('admin/routes.js'),
        reducers,
        styles: [
          { filepath: path.resolve('src','apps','maha','core','packages','reframe','style.less') },
          ...extract('admin/**/style.less')
        ],
        settings: extract('admin/settings.js'),
        userTasks: extract('admin/user_tasks.js'),
        userFields: extract('admin/user_fields.js'),
        userValues: extract('admin/user_values.js')
      }

      renderTemplate('index.js', variables)

      renderTemplate('client.js', variables)

      renderTemplate('index.less', variables)

    }

    const done = () => info('DEV', 'Finished compiling client')

    compiler.hooks.afterEnvironment.tap('MahaWebpackPlugin', create)

    compiler.hooks.invalid.tap('MahaWebpackPlugin', create)

    compiler.hooks.done.tap('MahaWebpackPlugin', done)
  }

}

export default MahaWebpackPlugin
