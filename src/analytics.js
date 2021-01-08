import './core/vendor/sourcemaps'
import './core/services/environment'
import { createBad, createGood } from '@apps/analytics/services/messages'
import * as knex from '@core/vendor/knex'
import nsq from 'nsqjs'

const parseMessage = (msg) => {
  const raw = msg.rawMessage.toString('hex').substr(52)
  return Buffer.from(raw, 'hex').toString('utf8')
}

const badevents = new nsq.Reader('BadEnrichedEvents', 'BadEnrichedEvents', {
  nsqdTCPAddresses: process.env.NSQD_URL
})

badevents.connect()

badevents.on('message', async msg => {

  knex.analytics.transaction(async trx => {

    try {

      await createBad({ trx }, {
        message: JSON.parse(parseMessage(msg))
      })

      trx.commit()

      msg.finish()

    } catch(e) {
      trx.rollback()
    }

  }).catch(err => {})

})

const goodevents = new nsq.Reader('EnrichedEvents', 'EnrichedEvents', {
  nsqdTCPAddresses: process.env.NSQD_URL
})

goodevents.connect()

goodevents.on('message', async msg => {

  knex.analytics.transaction(async trx => {

    try {

      await createGood({ trx }, {
        message: parseMessage(msg)
      })

      trx.commit()

      msg.finish()

    } catch(e) {
      console.log(e)
      trx.rollback()
    }

  }).catch(err => {})

})
