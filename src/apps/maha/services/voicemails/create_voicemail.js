import { createAssetFromUrl } from '@apps/maha/services/assets'
import generateCode from '@core/utils/generate_code'
import Voicemail from '@apps/maha/models/voicemail'
import socket from '@core/services/routes/emitter'

const createVoicemail = async(req, { call, url, duration }) => {

  const asset = await createAssetFromUrl(req, {
    url
  })

  const code = await generateCode(req, {
    table: 'phone_voicemails'
  })

  await Voicemail.forge({
    team_id: req.team.get('id'),
    call_id: call.get('id'),
    asset_id: asset.get('id'),
    code,
    duration,
    was_heard: false,
    was_handled: false
  }).save(null, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/phone/programs/${call.get('program_id')}/voicemails`
  ])

}

export default createVoicemail
