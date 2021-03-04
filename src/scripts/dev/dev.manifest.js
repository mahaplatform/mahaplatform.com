import transpile from '@core/utils/transpile'
import apps from '@core/utils/apps'
import log from '@core/utils/log'
import chokidar from 'chokidar'
import crypto from 'crypto'
import glob from 'glob'
import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'
import fs from 'fs'

const srcDir = path.resolve('src')

const templateDir = path.resolve(__dirname,'templates')

const configs = apps.reduce((configs, app) => {
  const configPath = path.join('src','apps',app,'app.js')
  const contents = fs.readFileSync(configPath, 'utf8')
  const transpiled = transpile(contents)
  const config = eval(transpiled)
  return {
    ...configs,
    [app]: config
  }
}, {})

const collectObjects = (pattern) => [
  ...glob.sync(`src/lib/admin/${pattern}`),
  ...glob.sync(`src/lib/admin/${pattern}/index.js`),
  ...glob.sync(`src/apps/*/admin/${pattern}`),
  ...glob.sync(`src/apps/*/admin/${pattern}/index.js`)
]

const extract = (pattern) => collectObjects(pattern).map(file => {
  const appMatches = file.match(/src\/apps\/(([^/]*).*)/)
  if(appMatches) return {
    ...configs[appMatches[2]],
    name: _.camelCase(appMatches[1].replace('/',' ')),
    filepath: `../../apps/${appMatches[1]}`
  }
  const matches = file.match(/src\/lib\/admin\/(([^/]*).*)/)
  return {
    code: 'admin',
    name: _.camelCase(matches[1].replace('/',' ')),
    filepath: `../../lib/admin/${matches[1]}`
  }
})

const reducers = (pattern) => collectObjects(pattern).map(file => {
  const appMatches = file.match(/src\/apps\/(([^/]*)\/admin\/(.*)\/(.*))\/reducer.js/)
  if(appMatches) return {
    ...configs[appMatches[2]],
    name: _.camelCase(appMatches[4].replace('/',' ')),
    filepath: `../../apps/${appMatches[1]}`
  }
  const matches = file.match(/src\/lib\/admin\/(([^/]*)\/(.*))\/reducer.js/)
  return {
    code: 'admin',
    name: _.camelCase(matches[3].replace('/',' ')),
    filepath: `../../lib/admin/${matches[1]}`
  }
})

const getHash = (content) => {
  return crypto.createHash('sha256').update(content, 'utf8').digest().toString('utf8')
}

const renderTemplate = (templateName, variables) => {
  const templatePath = path.join(templateDir,`${templateName}.ejs`)
  const template = fs.readFileSync(templatePath,'utf8')
  const data = ejs.render(template, variables)
  const destPath = path.join(srcDir,'core','admin',templateName)
  const oldhash = getHash(fs.readFileSync(destPath,'utf8'))
  const newhash = getHash(data)
  if(newhash === oldhash) return
  log('info', 'frontend', `Rebuilding ${templateName}`)
  fs.writeFileSync(destPath, data, 'utf8')
}

const buildManifest = _.debounce(() => {
  const variables = {
    activities: extract('activities/index.js'),
    badges: extract('badges/index.js'),
    dashboard: extract('dashboard/*/index.js'),
    roots: extract('roots/index.js'),
    routes: extract('views/index.js'),
    reducers: reducers('**/reducer.js'),
    styles: extract('**/style.less'),
    settings: extract('settings.js'),
    userTasks: extract('user_tasks.js'),
    userFields: extract('user_fields.js'),
    userValues: extract('user_values.js'),
    usage: extract('usage.js')
  }
  renderTemplate('app.js', variables)
  renderTemplate('index.less', variables)
}, 500)

const watchManifest = async () => {
  log('info', 'frontend', 'Watching manifest')
  chokidar.watch([
    path.join(srcDir,'lib','admin'),
    path.join(srcDir,'apps','*','admin','+(activities|badges|components|roots|tokens|views)/**')
  ], {
    ignoreInitial: true,
    ignored: /gitkeep$/
  }).on('all', buildManifest).on('ready', buildManifest)
}

export default watchManifest
