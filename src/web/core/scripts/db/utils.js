import knex from '../../services/knex'
import apps from '../../utils/apps'
import log from '../../utils/log'
import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'
import fs from 'fs'

const [,,,database] = process.env.DATABASE_URL.match(/(.*):\/\/([^/]*)\/(.*)/)

export const migrateUp = async () => await _migrate('up').then(schemaDump)

export const migrateDown = async () => await _migrate('down').then(schemaDump)

export const reset = async () => await _reset()

export const loadFixtures = async () => await _loadData('fixtures')

export const loadSeeds = async () => await _loadData('seeds')

export const setup = async () => await truncate().then(schemaLoad).then(loadFixtures)

export const truncate = async (flags, args) => {
  _log(`truncate ${database}`)
  await knex.raw('drop schema public cascade')
  await knex.raw('create schema public')
}

export const schemaDump = async (flags, args) => {
  _log('dump schema')
  const constraints = await _getConstraints()
  const foreign_keys = _.groupBy(constraints.foreign, (constraint) => constraint.table)
  const tables = await _getTables(constraints)
  const views = await _getViews()
  const template = fs.readFileSync(path.join(__dirname, 'schema.js.ejs'), 'utf8')
  const platform = _.camelCase(path.basename(path.resolve()))
  const data = ejs.render(template, { platform, tables, views, foreign_keys })
  if(process.env.NODE_ENV !== 'production') fs.writeFileSync(path.join('src', 'schema.js'), data)
}

export const schemaLoad = async (flags, args) => {
  _log('load schema')
  await knex.transaction(async trx => {
    const schema = require(path.resolve('src','schema.js')).default
    await schema.load(trx)
  })
}

const _migrate = async (direction) => {
  await _findOrCreateSchema()
  const appPaths = _getAppPaths()
  const allMigrations = _getMigrations(appPaths)
  const migrations = await _filterScripts(allMigrations, direction)
  await _runMigrations(migrations, direction)
  if(direction === 'down') await _dropSchema()
}

const _reset = async () => {
  await _migrate('down', null)
  await _migrate('up', null)
}

const _hasScriptBeenRun = async (migration) => {
  const result = await knex('schema_migrations').count('* as count').where({ migration })
  const response = result.rows ? result.rows[0] : result[0]
  const count = response.count ? parseInt(response.count) : 0
  return count !== 0
}

const _findOrCreateSchema = async () => {
  return await knex.schema.createTableIfNotExists('schema_migrations', (table) => table.string('migration'))
}

const _dropSchema = async () => {
  return await knex.schema.dropTableIfExists('schema_migrations')
}

const _runMigrations = (migrations, direction) => {
  return Promise.mapSeries(migrations, async migration => {
    await knex.transaction(async trx => {
      const runner = require(migration.path).default
      if(direction === 'up') {
        await runner.up(trx)
        await _recordMigration(migration.name, trx)
      } else {
        await runner.down(trx)
        await _removeMigration(migration.name, trx)
      }
      _log(migration.name)
    })
  })
}

const _recordMigration = (migration, trx) => {
  return trx('schema_migrations').insert({ migration })
}

const _removeMigration = (migration, trx) => {
  return trx('schema_migrations').where({ migration }).delete()
}

const _filterScripts = async (scripts, direction) => {
  if(direction === 'down') {
    return await Promise.filter(scripts.reverse(), async script => await _hasScriptBeenRun(script.name))
  } else {
    return await Promise.filter(scripts, async script => await _hasScriptBeenRun(script.name) === false)
  }
}

const _loadData = async (type) => {
  const appPaths = _getAppPaths()
  const fixtures = _getFixtures(appPaths, type)
  await Promise.mapSeries(fixtures, async fixture => {
    await knex.transaction(async trx => {
      _log(`run ${fixture.name}`)
      await trx.raw('set session_replication_role = replica')
      const creator = require(fixture.path).default
      await creator(trx)
      await trx.raw('set session_replication_role = default')
    })
  })
}

const _getMigrations = (appPaths) => _getSortedFiles(appPaths, 'migrations')

const _getFixtures = (appPaths, type) => _getSortedFiles(appPaths, type)

const _getSortedFiles = (appPaths, targetPath) => {
  const sorted = _.castArray(appPaths).reduce((files, appPath) => {
    const dbPath = path.join(appPath, 'db')
    const fullTargetPath = path.join(dbPath, targetPath)
    if(!fs.existsSync(fullTargetPath)) return files
    return [
      ...files,
      ...fs.readdirSync(fullTargetPath).map(name => {
        const matches = name.match(/(\d{13}).*/)
        return {
          name,
          path: path.join(fullTargetPath, name),
          ...matches ? { timestamp: matches[1] } : {}
        }
      })
    ]
  }, []).filter(file => {
    return !_.isNil(file.name.match(/.*\.js$/))
  }).sort((first, second) => {
    if(first.name < second.name) return -1
    if(first.name > second.name) return 1
    return 0
  })
  return sorted
}

const _getAppPaths = () => {
  return apps.map(app => path.resolve(__dirname,'..','..', 'apps', app))
}

const _getTables = async (constraints) => {
  const tables = await knex.raw('select tablename from pg_catalog.pg_tables where schemaname=\'public\' order by tablename')
  return await Promise.mapSeries(tables.rows, async(table) => {
    const fields = await knex.raw(`select * from information_schema.columns where table_name='${table.tablename}'`)
    return {
      name: table.tablename,
      fields: fields.rows.map(field => ({
        name: field.column_name,
        definition: _getFieldType(field, constraints),
        nullable: _getNullable(field),
        default: _getDefault(field)
      }))
    }
  })
}

const _getViews = async () => {
  const views = await knex.raw('select * from information_schema.views where table_schema=\'public\' order by table_name')
  return views.rows.map((view) => ({
    name: view.table_name,
    definition: view.view_definition.replace(/[\s\t]{2,}/g, '\n      ').toLowerCase()
  }))
}

const _getConstraints = async () => {
  const constraints = await knex.raw('SELECT tc.constraint_name, tc.constraint_type, tc.table_name, kcu.column_name, ccu.table_name AS foreign_table_name, ccu.column_name AS foreign_column_name  FROM information_schema.table_constraints tc JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name AND ccu.table_schema = tc.table_schema')
  return constraints.rows.reduce((constraints, constraint) => ({
    ...constraints,
    primary: (constraint.constraint_type === 'PRIMARY KEY') ? [
      ...constraints.primary,
      {
        name: constraint.constraint_name,
        table: constraint.table_name,
        column: constraint.column_name
      }
    ] : constraints.primary,
    foreign: (constraint.constraint_type === 'FOREIGN KEY') ? [
      ...constraints.foreign,
      {
        name: constraint.constraint_name,
        table: constraint.table_name,
        column: constraint.column_name,
        foreign_table: constraint.foreign_table_name,
        foreign_column: constraint.foreign_column_name
      }
    ] : constraints.foreign
  }), { primary: [], foreign: []})
}

const _getFieldType = (field, constraints) => {
  const primary = _.find(constraints.primary, { table: field.table_name, column: field.column_name })
  const foreign = _.find(constraints.foreign, { table: field.table_name, column: field.column_name })
  if(primary) return `.increments('${field.column_name}').primary()`
  if(foreign) return `.integer('${field.column_name}').unsigned()`
  if(field.data_type === 'character varying') return `.string('${field.column_name}', ${field.character_maximum_length})`
  if(field.data_type === 'text') return `.text('${field.column_name}')`
  if(field.data_type === 'numeric') return `.decimal('${field.column_name}', ${field.numeric_precision}, ${field.numeric_scale})`
  if(field.data_type === 'timestamp with time zone') return `.timestamp('${field.column_name}')`
  if(field.data_type === 'time without time zone') return `.time('${field.column_name}')`
  if(field.data_type === 'ARRAY') return `.specificType('${field.column_name}', '${field.udt_name.substr(1)}[]')`
  return `.${field.data_type}('${field.column_name}')`
}

const _getNullable = (field) => {
  return field.is_nullable ? '': '.notNullable()'
}

const _getDefault = (field) => {
  if(!(field.column_default && field.column_default.substr(0,7) !== 'nextval')) return ''
  if(field.column_default.match(/numeric/) !== null) return `.defaultsTo(${parseInt(0).toFixed(field.numeric_precision - field.numeric_scale)})`
  const column_default = field.column_default.replace('::jsonb', '')
  return `.defaultsTo(${column_default})`
}

const _log = (text) => {
  if(process.env.NODE_ENV === 'test') return
  log('info', 'db', text)
}
