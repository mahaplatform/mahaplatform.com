import CallConnection from '@apps/maha/models/call_connection'
import socket from '@core/services/routes/emitter'
import twilio from '@core/vendor/twilio'
import Queue from '@core/objects/queue'
import SMS from '@apps/maha/models/sms'

export const processor = async (req) => {

  const smses = await SMS.query(qb => {
    qb.whereNotNull('sid')
    qb.whereNull('price')
    qb.whereNotNull('sid')
  }).fetchAll({
    transacting: req.trx
  })

  await Promise.mapSeries(smses, async (sms) => {

    try {

      const twsms = await twilio.messages(sms.get('sid')).fetch()

      if(!twsms.price) return

      await sms.save({
        price: Math.abs(twsms.price)
      }, {
        transacting: req.trx,
        patch: true
      })

    } catch(err) {
      console.log(err)
    }

  })

  const connections = await CallConnection.query(qb => {
    qb.whereNotNull('sid')
    qb.whereNull('price')
    qb.whereNotNull('sid')
  }).fetchAll({
    transacting: req.trx
  })

  await Promise.mapSeries(connections, async (connection) => {

    try {

      const twcall = await twilio.calls(connections.get('sid')).fetch()

      if(!twcall.price) return

      await connections.save({
        duration: twcall.duration,
        price: Math.abs(twcall.price)
      }, {
        transacting: req.trx,
        patch: true
      })

    } catch(err) {
      console.log(err)
    }

  })

}

export const afterCommit = async (req, result) => {
  await socket.refresh(req, [
    '/admin/team/calls',
    '/admin/team/sms'
  ])
}

const getTwilioPricesCron = new Queue({
  queue: 'cron',
  name: 'get_twilio_prices',
  cron: '0 0 * * * *',
  processor,
  afterCommit
})

export default getTwilioPricesCron
