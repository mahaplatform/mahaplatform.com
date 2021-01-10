import './core/vendor/sourcemaps'
import './core/services/environment'
import { parseMessage, processMessage } from '@apps/analytics/services/messages'
import * as knex from '@core/vendor/knex'
import nsq from 'nsqjs'

const badevents = new nsq.Reader('BadEnrichedEvents', 'BadEnrichedEvents', {
  nsqdTCPAddresses: process.env.NSQD_URL
})

badevents.connect()

badevents.on('message', async msg => {

  knex.analytics.transaction(async trx => {

    msg.finish()

  }).catch(err => {})

})

const goodevents = new nsq.Reader('EnrichedEvents', 'EnrichedEvents', {
  nsqdTCPAddresses: process.env.NSQD_URL
})

goodevents.connect()

goodevents.on('message', async msg => {

  knex.analytics.transaction(async trx => {

    try {

      const message = parseMessage(msg)

      await processMessage({ trx }, { message })

      trx.commit()

      msg.finish()

    } catch(e) {
      console.log(e)
      trx.rollback()
    }

  }).catch(err => {})

})
