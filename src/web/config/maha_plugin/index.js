import transpile from '../../core/utils/transpile'
import log from '../../core/utils/log'
import glob from 'glob'
import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'
import fs from 'fs'

const apps = process.env.APPS.split(',')

const configs = apps.reduce((configs, app) => {

  const configPath = path.resolve('src','web','apps',app,'app.js')

  const contents = fs.readFileSync(configPath, 'utf8')

  const transpiled = transpile(contents)

  const config = eval(transpiled)

  return {
    ...configs,
    [app]: config
  }

}, {})

const collectObjects = (pattern) => [
  ...glob.sync(`src/web/apps/*/${pattern}`),
  ...glob.sync(`src/web/apps/*/${pattern}/index.js`)
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
      if(file) log('info', 'dev', `Detected change in ${file.replace(path.resolve(), '')}`)
      if(file) log('info', 'dev', 'Recompiling client')
      if(!file) log('info', 'dev', 'Compiling client')

      const reducers = collectObjects('admin/**/reducer.js').map(file => {
        const matches = file.match(/(src\/web\/apps\/([^/]*)\/admin\/(.*)\/(.*))\/reducer.js/)
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
          { filepath: path.resolve('src','web','core','reframe','style.less') },
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

    const done = () => log('info', 'dev', 'Finished compiling client')

    compiler.hooks.afterEnvironment.tap('MahaWebpackPlugin', create)

    compiler.hooks.invalid.tap('MahaWebpackPlugin', create)

    compiler.hooks.done.tap('MahaWebpackPlugin', done)
  }

}

export default MahaWebpackPlugin
