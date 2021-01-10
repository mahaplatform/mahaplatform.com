import './core/vendor/sourcemaps'
import './core/services/environment'
import { parseMessage, processMessage } from '@apps/analytics/services/messages'
import Raw from '@apps/analytics/models/raw'
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

    const message = parseMessage(msg)

    try {

      const raw =  await Raw.forge({
        data: message,
        status: 'pending'
      }).save(null, {
        transacting: trx
      })

      try {

        await processMessage({ trx }, { message })

        await raw.save(null, {
          status: 'processed'
        })

      } catch(e) {

        await raw.save(null, {
          status: 'failed'
        })

      }

      trx.commit()

      msg.finish()

    } catch(err) {

      trx.rollback(err)

    }

  }).catch(err => console.log(err))

})
