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
      data: {
        action: 'complete',
        voicemail_id: voicemail.get('id')
      }
    },
    next: getNext(req, { config, state }),
    twiml
  }

}

export default complete
