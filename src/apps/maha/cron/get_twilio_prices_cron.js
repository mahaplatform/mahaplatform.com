import socket from '@core/services/routes/emitter'
import cron from '@core/objects/cron'
import twilio from '@core/vendor/twilio'
import Call from '../models/call'
import SMS from '../models/sms'
import Fax from '../models/fax'

export const processor = async (req) => {

  const smses = await SMS.query(qb => {
    qb.whereNotNull('sid')
    qb.whereNull('price')
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

  const calls = await Call.query(qb => {
    qb.whereNotNull('sid')
    qb.whereNull('price')
  }).fetchAll({
    transacting: req.trx
  })

  await Promise.mapSeries(calls, async (call) => {

    try {

      const twcall = await twilio.calls(call.get('sid')).fetch()

      if(!twcall.price) return

      await call.save({
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

  const faxes = await Fax.query(qb => {
    qb.whereNotNull('sid')
    qb.whereNull('price')
  }).fetchAll({
    transacting: req.trx
  })

  await Promise.mapSeries(faxes, async (fax) => {

    try {

      const twfax = await twilio.fax.faxes(fax.get('sid')).fetch()

      if(!twfax.price) return

      await fax.save({
        price: Math.abs(twfax.price)
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
    '/admin/team/faxes',
    '/admin/team/sms'
  ])
}

const getTwilioPricesCron = cron({
  name: 'get_twilio_prices',
  schedule: '0 0 * * * *',
  processor,
  afterCommit
})

export default getTwilioPricesCron
