import '../../web/core/services/environment'
import { migrateUp, migrateDown, reset } from './db'
import { schemaDump, schemaLoad } from './schema'
import register from 'babel-register'
import fs from 'fs'

const babelrc = JSON.parse(fs.readFileSync('.babelrc'))

register(babelrc)

const processor = async () => {

  const args = process.argv.slice(2)

  if(args[0] === 'migrate:rollback') return await migrateDown()

  if(args[0] === 'migrate:latest') return await migrateUp()

  if(args[0] === 'schema:dump') return await schemaDump()

  if(args[0] === 'schema:load') return await schemaLoad()

  if(args[0] === 'reset') return await reset()

  throw new Error('invalid command')

}

processor().then(process.exit)
