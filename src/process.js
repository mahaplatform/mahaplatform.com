import './core/vendor/sourcemaps'
import './core/services/environment'
import { processRaw } from '@apps/analytics/services/messages'
import * as knex from '@core/vendor/knex'

knex.analytics.transaction(async trx => {
  try {

    const req = { trx }

    await processRaw(req, {
      id: 1
    })

  } catch(e) { console.log(e) }

})
