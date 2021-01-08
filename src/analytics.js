import './core/vendor/sourcemaps'
import './core/services/environment'
import { createBad, createGood } from '@apps/analytics/services/messages'
import knex from '@core/vendor/knex'
import nsq from 'nsqjs'

const parseMessage = (msg) => {
  const raw = msg.rawMessage.toString('hex').substr(52)
  return JSON.parse(Buffer.from(raw, 'hex').toString('utf8'))
}

const badevents = new nsq.Reader('BadEnrichedEvents', 'BadEnrichedEvents', {
  nsqdTCPAddresses: process.env.NSQD_URL
})

badevents.connect()

badevents.on('message', async msg => {

  knex.analytics.transaction(async trx => {

    await createBad({ trx }, {
      message: parseMessage(msg)
    })

    msg.finish()

  }).catch(err => {})

})

const goodevents = new nsq.Reader('EnrichedEvents', 'EnrichedEvents', {
  nsqdTCPAddresses: process.env.NSQD_URL
})

goodevents.connect()

goodevents.on('message', async msg => {

  knex.analytics.transaction(async trx => {

    await createGood({ trx }, {
      message: parseMessage(msg)
    })

    msg.finish()

  }).catch(err => {})

})
