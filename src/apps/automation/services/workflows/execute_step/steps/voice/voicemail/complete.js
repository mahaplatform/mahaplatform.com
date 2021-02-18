import { createVoicemail } from '@apps/maha/services/voicemails'
import { getNext } from '../../utils'

const complete = async (req, { config, enrollment, state, step, twiml }) => {

  const voicemail = await createVoicemail(req, {
    call: enrollment.related('call'),
    url: req.body.RecordingUrl,
    duration: req.body.RecordingDuration
  })

  return {
    action: {
      voicemail_id: voicemail.get('id'),
      data: {
        action: 'complete'
      }
    },
    next: getNext(req, { config, state }),
    twiml
  }

}

export default complete
