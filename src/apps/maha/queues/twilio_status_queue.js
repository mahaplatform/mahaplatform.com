import CallActivity from '@apps/maha/models/call_activity'
import { getCall } from '@apps/maha/services/calls'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  const { sid, data, tstamp } = job.data

  const call = await getCall(req, {
    sid
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
