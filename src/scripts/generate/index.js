import pluralize from 'pluralize'
import moment from 'moment'
import dotenv from 'dotenv'
import mkdirp from 'mkdirp'
import chalk from 'chalk'
import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'
import fs from 'fs'

dotenv.load({ path: path.join('.env') })

const createFile = (filepath, templateName, data = {}) => {
  if(fs.existsSync(filepath)) return console.log(chalk.cyan('exists'), chalk.white(filepath))
  const templatepath = path.join(__dirname, `${templateName}.ejs`)
  const template = fs.readFileSync(templatepath, 'utf8')
  const source = ejs.render(template, { ...data, _ })
  mkdirp.sync(path.join(...filepath.split('/').slice(0,-1)))
  fs.writeFileSync(filepath, source)
  console.log(chalk.green('create'), chalk.white(filepath))
}

const app = async (args) => {
  const [ appName ] = args
  const root = path.join('src','apps',appName)
  const data = { appName }
  createFile(`${root}/admin/api/index.js`, 'app/api.js', data)
  createFile(`${root}/admin/badges/.gitkeep`, 'app/gitkeep', data)
  createFile(`${root}/admin/components/.gitkeep`, 'app/gitkeep', data)
  createFile(`${root}/admin/roots/.gitkeep`, 'app/gitkeep', data)
  createFile(`${root}/admin/tokens/.gitkeep`, 'app/gitkeep', data)
  createFile(`${root}/admin/views/index.js`, 'app/routes.js', data)
  createFile(`${root}/admin/navigation.js`, 'app/navigation.js', data)
  createFile(`${root}/admin/notifications.js`, 'app/notifications.js', data)
  createFile(`${root}/admin/rights.js`, 'app/rights.js', data)
  createFile(`${root}/admin/search.js`, 'app/search.js', data)
  createFile(`${root}/cron/.gitkeep`, 'app/gitkeep', data)
  createFile(`${root}/db/fixtures/.gitkeep`, 'app/gitkeep', data)
  createFile(`${root}/db/migrations/.gitkeep`, 'app/gitkeep', data)
  createFile(`${root}/emails/.gitkeep`, 'app/gitkeep', data)
  createFile(`${root}/help/.gitkeep`, 'app/gitkeep', data)
  createFile(`${root}/models/.gitkeep`, 'app/gitkeep', data)
  createFile(`${root}/public/.gitkeep`, 'app/gitkeep', data)
  createFile(`${root}/queues/.gitkeep`, 'app/gitkeep', data)
  createFile(`${root}/serializers/.gitkeep`, 'app/gitkeep', data)
  createFile(`${root}/services/.gitkeep`, 'app/gitkeep', data)
  createFile(`${root}/app.js`, 'app/app.js', data)
}

const route = async (args) => {
  const [ root ] = args
  const route = root.split('/').pop()
  const data = {
    routeName: route,
    routePath: `${root}.js`
  }
  createFile(`${root}.js`, 'resource/route.js', data)
  createFile(`${root}_test.js`, 'resource/test.js', data)
}

const resource = async (args) => {
  const [ root ] = args
  const routes = ['list','create','show','edit','update','destroy']
  createFile(path.join(root, 'index.js'), 'resource/index.js', {})
  routes.map(route => {
    const data = {
      routeName: route,
      routePath: path.join(root, `${route}.js`)
    }
    createFile(path.join(root, `${route}.js`), 'resource/route.js', data)
    createFile(path.join(root, `${route}_test.js`), 'resource/test.js', data)
  })
}

const model = async (args) => {
  const [ app, model ] = args
  const root = path.join('src','apps',app)
  const timestamp = moment().format('YYYYMMDDHHmmss')
  const singluar = pluralize.singular(model).toLowerCase()
  const plural = pluralize.plural(model).toLowerCase()
  const className = _.upperFirst(_.camelCase(singluar))
  const tableName = _.snakeCase(plural)
  const modelName = _.snakeCase(singluar)
  const data = {
    className, tableName, modelName,
    fixturesPath: path.join(root, 'db', 'fixtures', `${timestamp}_${tableName}.js`),
    migrationPath: path.join(root, 'db', 'migrations', `${timestamp}_create_${tableName}.js`),
    modelPath: path.join(root, 'models', `${modelName}.js`),
    testPath: path.join(root, 'models', `${modelName}_test.js`),
    serializerPath: path.join(root, 'serializers', `${modelName}_serializer.js`)
  }
  createFile(data.modelPath, 'model/model.js', data)
  createFile(data.migrationPath, 'model/migration.js', data)
  createFile(data.fixturesPath, 'model/fixtures.js', data)
  createFile(data.migrationPath, 'serializer/serializer.js', data)
  createFile(data.testPath, 'model/test.js', data)
}

const migration = async (args) => {
  const [ app, name ] = args
  const timestamp = moment().format('YYYYMMDDHHmmss')
  const root = path.join('src','apps',app,'db','migrations')
  const data = {
    className:  _.upperFirst(_.camelCase(name)),
    migrationPath: path.join(root, `${timestamp}_${name}.js`)
  }
  createFile(data.migrationPath, 'migration/migration.js', data)
}

const serializer = async (args) => {
  const [ root, model ] = args
  const singluar = pluralize.singular(model).toLowerCase()
  const modelName = _.snakeCase(singluar)
  const data = {
    modelName,
    serializerPath: path.join(root, 'serializers', `${modelName}_serializer.js`)
  }
  createFile(data.serializerPath, 'serializer/serializer.js', data)
}

const component = async (args) => {
  const [ root ] = args
  const componentName = _.snakeCase(root.split('/').slice(-1)[0])
  const className = _.upperFirst(_.camelCase(componentName))
  const styleName = _.kebabCase(componentName)
  const data = {
    componentName, className, styleName,
    rootPath: root,
    componentPath: path.join(root, 'index.js'),
    testPath: path.join(root, 'test.js'),
    stylePath: path.join(root, 'style.less')
  }
  createFile(data.componentPath, 'component/component.js', data)
  createFile(data.testPath, 'component/test.js', data)
  createFile(data.stylePath, 'component/style.less', data)
}

const rubberstamp = async (args) => {
  const [ root ] = args
  const componentName = _.snakeCase(root.split('/').slice(-1)[0])
  const className = _.upperFirst(_.camelCase(componentName))
  const styleName = _.kebabCase(componentName)
  const data = {
    componentName, className, styleName,
    rootPath: root,
    actionsPath: path.join(root, 'actions.js'),
    selectorsPath: path.join(root, 'selectors.js'),
    reducerPath: path.join(root, 'reducer.js'),
    indexPath: path.join(root, 'index.js'),
    componentPath: path.join(root, `${componentName}.js`),
    testPath: path.join(root, 'test.js'),
    stylePath: path.join(root, 'style.less')
  }
  createFile(data.actionsPath, 'rubberstamp/actions.js', data)
  createFile(data.selectorsPath, 'rubberstamp/selectors.js', data)
  createFile(data.reducerPath, 'rubberstamp/reducer.js', data)
  createFile(data.indexPath, 'rubberstamp/index.js', data)
  createFile(data.componentPath, 'rubberstamp/component.js', data)
  createFile(data.testPath, 'rubberstamp/test.js', data)
  createFile(data.stylePath, 'rubberstamp/style.less', data)
}

const page = async (args) => {
  const [ root ] = args
  const data = {
    pagePath: `${root}.js`
  }
  createFile(data.pagePath, 'page/page.js', data)
}

const generate = async () => {
  const argv = process.argv.slice(2)
  const template = argv[0]
  const args = argv.slice(1)
  if(template === 'app') return app(args)
  if(template === 'route') return route(args)
  if(template === 'model') return model(args)
  if(template === 'migration') return migration(args)
  if(template === 'serializer') return serializer(args)
  if(template === 'component') return component(args)
  if(template === 'rubberstamp') return rubberstamp(args)
  if(template === 'resource') return resource(args)
  if(template === 'page') return page(args)
}

generate().then(() => process.exit())
