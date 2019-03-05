import { writePaddedLine } from '../../utils/console'
import chalk from 'chalk'
import Knex from 'knex'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'

const [connection, protocol] = process.env.DATABASE_URL.match(/(.*):\/\/\/?(.*)/)

const knex = new Knex({
  client: protocol === 'postgres' ? 'postgresql' : protocol,
  connection,
  useNullAsDefault: true,
  pool: {
    min: 1,
    max: 1
  }
})

export const migrateUp = async () => await _migrate('up')

export const migrateDown = async () => await _migrate('down')

export const reset = async () => await _reset()

export const loadFixtures = async () => await _loadData('fixtures')

export const loadSeeds = async () => await _loadData('seeds')

export const setupTestDb = async () => await migrateDown().then(migrateUp).then(loadFixtures)

export const teardownTestDb = async () => await migrateDown()

export const beginTransaction = () => knex.raw('BEGIN TRANSACTION')

export const rollbackTransaction = () => knex.raw('ROLLBACK TRANSACTION')

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

      _log(chalk.grey(migration.name), chalk.green('✔'), true, true)


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

  const allFixtures = _getFixtures(appPaths, type)

  const merged = _mergeFixtures(allFixtures)

  const withIds = _assignIds(merged)

  const interpolated = await _renderFixtures(withIds)

  await Promise.mapSeries(Object.keys(interpolated), async tableName => {

    await knex.transaction(async trx => {

      _log(chalk.grey(tableName))

      if(knex.client.config.client === 'postgresql') await trx.raw('set session_replication_role = replica')

      await trx(tableName).del()

      const records = interpolated[tableName]

      const chunks = _.chunk(records, 50)

      await Promise.mapSeries(chunks, async chunk => await trx(tableName).insert(chunk)).catch(console.log)

      try {

        if(knex.client.config.client === 'postgresql') {

          const idColumn = await trx.raw(`SELECT column_name FROM information_schema.columns WHERE table_name='${tableName}' and column_name='id'`)

          if(idColumn.rowCount > 0) await trx.raw(`SELECT pg_catalog.setval(pg_get_serial_sequence('${tableName}', 'id'), MAX(id)) FROM ${tableName}`)

        }
      } catch(e) {}

      if(trx.client.config.client === 'postgresql') await trx.raw('set session_replication_role = default')

      _log(chalk.grey(tableName), chalk.green('✔'), true, true)

    })

  })

}

// load all fixtures from across apps, and merge all data into a single
// nested hash
const _mergeFixtures = (files) => {

  return files.reduce((merged, file) => {

    const { tableName, records } = require(file.path).default

    return {
      ...merged,
      [tableName]: (_.isArray(records)) ? [
        ...merged[tableName] || [],
        ...records
      ] : {
        ...merged[tableName],
        ...records
      }
    }

  }, {})

}

// loop through all fixtures from each table and preemtively assign an id,
// creating a map for lookups
const _assignIds = (data) => {

  return Object.keys(data).reduce((tables, tableName) => {

    const fixtures = data[tableName]

    if(_.isArray(fixtures)) {

      return {
        ...tables,
        [tableName]: fixtures
      }

    }

    const withIds = Object.keys(fixtures).reduce((withIds, name, index) => ({
      ...withIds,
      [name]: {
        id: index + 1,
        values: fixtures[name]
      }
    }), {})

    return {
      ...tables,
      [tableName]: withIds
    }

  }, {})

}

// loop through all fixtures and call the function with the data hash, allowing
// each fixture to interpolate ids from orher named fixtures
const _renderFixtures = (data) => {

  return Promise.reduce(Object.keys(data), async (tables, tableName) => {

    const columns = await knex(tableName).columnInfo()

    const fixtures = data[tableName]

    if(_.isArray(fixtures)) {

      return {
        ...tables,
        [tableName]: fixtures
      }

    }

    const interpolated = Object.keys(fixtures).reduce((interpolated, name) => {

      const fixtureData = _renderFixture(tableName, fixtures, name, data)

      if(columns.id) {

        return [
          ...interpolated,
          {
            id: fixtures[name].id,
            ...fixtureData
          }
        ]

      }

      return [
        ...interpolated,
        fixtureData
      ]

    }, [])

    return {
      ...tables,
      [tableName]: interpolated
    }

  }, {})

}

const _renderFixture = (tableName, fixtures, name, data) => {

  try {

    return fixtures[name].values(data)

  } catch(err) {

    throw new Error(`Unable to load fixture data for '${name}' in '${tableName}' (${err.message})`)

  }

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

  return  process.env.APPS.split(',').map(app => path.resolve('apps', app, 'src'))

}

const _log = (label, text = '', newline = false, rewind = false) => {

  if(process.env.NODE_ENV === 'test') return

  writePaddedLine(label, text, '#FFFFFF', newline, rewind)

}
