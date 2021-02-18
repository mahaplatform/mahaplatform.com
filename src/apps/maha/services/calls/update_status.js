import { getConnection } from '@apps/maha/services/calls'
import CallStatus from '@apps/maha/models/call_status'
import { getCall } from '@apps/maha/services/calls'
import twilio from '@core/vendor/twilio'
import moment from 'moment'

const updateStatus = async (req, { body, parent_sid, sid }) => {

  const call = await getCall(req, {
    sid: parent_sid
  })

  await call.load(['team'], {
    transacting: req.trx
  })

  req.team = call.related('team')

  const connection = await getConnection(req, {
    call,
    sid
  })

  const twcall = await twilio.calls(sid).fetch()

  if(sid === connection.get('sid')) {
    await connection.save({
      status: twcall.status,
      duration: twcall.duration,
      started_at: twcall.startTime,
      ended_at: twcall.endTime
    }, {
      transacting: req.trx
    })
  }

  if(sid === call.get('sid')) {
    await call.save({
      status: twcall.status
    }, {
      transacting: req.trx
    })
  }

  await CallStatus.forge({
    team_id: call.get('team_id'),
    call_connection_id: connection.get('id'),
    status: body.CallStatus,
    tstamp: body.Timestamp ? moment(body.Timestamp, 'ddd, DD MMM YYYY HH:mm:ss.SSSZ') : moment()
  }).save(null, {
    transacting: req.trx
  })

}

export default updateStatus
