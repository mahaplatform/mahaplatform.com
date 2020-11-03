// ssh -i ~/.ssh/mahaplatform -L 127.0.0.1:1234:127.0.0.1:5432 centos@3.208.31.159

import './core/services/sourcemaps'
import './core/services/environment'
import knex from './core/services/knex'

const processor = async () => {
  await knex.transaction(async(trx) => {
  })
}

processor().then(process.exit)
