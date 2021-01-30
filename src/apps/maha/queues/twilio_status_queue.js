import { createAssetFromUrl } from '@apps/maha/services/assets'
import CallActivity from '@apps/maha/models/call_activity'
import generateCode from '@core/utils/generate_code'
import Voicemail from '@apps/maha/models/voicemail'
import { getCall } from '@apps/maha/services/calls'
import socket from '@core/services/routes/emitter'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  const { body, sid } = job.data

  const call = await getCall(req, {
    sid
  })

  await call.load(['team'], {
    transacting: req.trx
  })

  req.team = call.related('team')

  if(body.Result) {

    const { verb, action } = body.Result

    if(verb === 'voicemail' && action === 'complete') {

      const asset = await createAssetFromUrl(req, {
        url: body.RecordingUrl
      })

      const code = await generateCode(req, {
        table: 'phone_voicemails'
      })

      await Voicemail.forge({
        team_id: req.team.get('id'),
        call_id: call.get('id'),
        asset_id: asset.get('id'),
        code,
        duration: body.RecordingDuration,
        was_heard: false,
        was_handled: false
      }).save(null, {
        transacting: req.trx
      })

      await socket.refresh(req, [
        `/admin/phone/programs/${call.get('program_id')}/voicemails`
      ])



    }

  }

  // const { sid, data, tstamp } = job.data
  //
  // const call = await getCall(req, {
  //   sid
  // })
  //
  // await CallActivity.forge({
  //   team_id: call.get('team_id'),
  //   call_id: call.get('id'),
  //   data,
  //   tstamp
  // }).save(null, {
  //   transacting: req.trx
  // })

}

const TwilioStatusQueue = new Queue({
  queue: 'twilio',
  name: 'status',
  remove: false,
  processor
})

export default TwilioStatusQueue
