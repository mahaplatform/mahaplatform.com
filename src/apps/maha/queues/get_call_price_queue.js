import twilio from '../../../core/services/twilio'
import Queue from '../../../core/objects/queue'
import Call from '../models/call'

const processor = async (req, job) => {

  const call = await Call.query(qb => {
    qb.where('id', job.data.id)
  }).fetch({
    withRelated: ['to','from','team'],
    transacting: req.trx
  })

  const twcall = await twilio.calls(call.get('sid')).fetch()

  if(!twcall.price) throw new Error('no price')

  await call.save({
    duration: twcall.duration,
    price: Math.abs(twcall.price)
  }, {
    transacting: req.trx,
    patch: true
  })

}

const GetCallPriceQueue = new Queue({
  name: 'get_call_price',
  processor
})

export default GetCallPriceQueue
