import CallActivity from '@apps/maha/models/call_activity'
import PhoneNumber from '@apps/maha/models/phone_number'
import Number from '@apps/maha/models/number'
import Call from '@apps/maha/models/call'
import Queue from '@core/objects/queue'

const getCall = async (req, { data }) => {

  const call = await Call.query(qb => {
    qb.where('sid', data.sid)
  }).fetch({
    withRelated: ['phone_number'],
    transacting: req.trx
  })

  if(call) return call

  const from = await Number.fetchOrCreate({
    number: data.from
  },{
    transacting: req.trx
  })

  const to = await Number.fetchOrCreate({
    number: data.to
  },{
    transacting: req.trx
  })

  const phone_number = await PhoneNumber.where({
    number: data.direction === 'inbound' ? data.to : data.from
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  return await Call.forge({
    team_id: phone_number.get('team_id'),
    from_id: from.get('id'),
    to_id: to.get('id'),
    direction: data.direction === 'inbound' ? 'inbound' : 'outbound',
    sid: data.sid,
    program_id: phone_number.related('program').get('id'),
    phone_number_id: phone_number.get('id')
  }).save(null, {
    transacting: req.trx
  })

}

const processor = async (req, job) => {

  const { data, tstamp } = job.data

  const call = await getCall(req, {
    data
  })

  await CallActivity.forge({
    team_id: call.get('team_id'),
    call_id: call.get('id'),
    data,
    tstamp
  }).save(null, {
    transacting: req.trx
  })

}

const TwilioStatusQueue = new Queue({
  queue: 'twilio',
  name: 'status',
  remove: false,
  processor
})

export default TwilioStatusQueue
