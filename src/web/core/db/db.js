import { migrateUp, migrateDown, schemaDump, schemaLoad, setup, reset } from './utils'

const db = async (command) => {

  if(command === 'migrate:down') return await migrateDown()

  if(command === 'migrate:up') return await migrateUp()

  if(command === 'schema:dump') return await schemaDump()

  if(command === 'schema:load') return await schemaLoad()

  if(command === 'db:setup') return await setup()

  if(command === 'db:reset') return await reset()

  throw new Error('invalid command')

}

export default db
