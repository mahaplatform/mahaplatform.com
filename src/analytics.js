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

  const message = parseMessage(msg)

  const raw = await new Promise((resolve, reject) => {

    knex.analytics.transaction(async trx => {

      try {

        const raw =  await Raw.forge({
          data: message,
          status: 'pending'
        }).save(null, {
          transacting: trx
        })
        trx.commit()
        resolve(raw)

      } catch(err) {

        trx.rollback()
        reject(err)

      }

    }).catch(reject)

  })

  knex.analytics.transaction(async trx => {

    try {

      await processMessage({ trx }, { message })

      await raw.save(null, {
        status: 'processed'
      })

      trx.commit()

      msg.finish()

    } catch(e) {
      console.log(e)
      trx.rollback()
    }

  }).catch(err => {})

})
