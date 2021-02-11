import { createVoicemail } from '@apps/maha/services/voicemails'
import CallActivity from '@apps/maha/models/call_activity'
import { getConnection } from '@apps/maha/services/calls'
import { getCall } from '@apps/maha/services/calls'
// import socket from '@core/services/routes/emitter'
import Story from '@apps/maha/models/story'
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

  if(body.Result) {
    const { verb, action } = body.Result
    if(verb === 'voicemail' && action === 'complete') {
      await createVoicemail(req, {
        call,
        url:  body.RecordingUrl,
        duration: body.RecordingDuration
      })
    }

  }

  const story = await Story.fetchOrCreate({
    text: body.CallStatus
  }, {
    transacting: req.trx
  })

  await CallActivity.forge({
    team_id: call.get('team_id'),
    call_connection_id: connection.get('id'),
    story_id: story.get('id'),
    data: {},
    tstamp: moment(body.Timestamp, 'ddd, DD MMM YYYY HH:mm:ss 000')
  }).save(null, {
    transacting: req.trx
  })

}

export default updateStatus
