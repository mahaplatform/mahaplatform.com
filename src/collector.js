import './core/vendor/sourcemaps'
import './core/services/environment'
import { parseMessage } from '@apps/analytics/services/messages'
import { processEvent } from '@apps/analytics/services/raws'
import * as knex from '@core/vendor/knex'
import nsq from 'nsqjs'

const badevents = new nsq.Reader('BadEnrichedEvents', 'BadEnrichedEvents', {
  nsqdTCPAddresses: process.env.NSQD_URL
})

badevents.connect()

badevents.on('message', async msg => {

  knex.analytics.transaction(async analytics => {

    try {

      msg.finish()

    } catch(err) {

      analytics.rollback(err)
      console.log(err)

    }

  }).catch(err => {})

})

const goodevents = new nsq.Reader('EnrichedEvents', 'EnrichedEvents', {
  nsqdTCPAddresses: process.env.NSQD_URL
})

goodevents.connect()

goodevents.on('message', async msg => {

  knex.analytics.transaction(async analytics => {

    try {

      const message = parseMessage(msg)

      await processEvent({ analytics }, {
        message
      })

      msg.finish()

    } catch(err) {

      analytics.rollback(err)

    }

  }).catch(err => {})

})
