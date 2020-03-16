import Asset from '../../../../maha/models/asset'
import { twiml } from 'twilio'

const voiceQuestion = async (req, { enrollment, step, digits }) => {

  const { strategy, voice, message, recording_id } = step.get('config')

  if(digits) {

    const answer = step.get('config').branches.find(branch => {
      return branch.value === digits
    })

    return {
      data: {
        answer: answer.code
      },
      condition: {
        parent: step.get('code'),
        answer: answer.code,
        delta: -1
      }
    }

  }

  const response = new twiml.VoiceResponse()

  const gather = response.gather({
    action: `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}/gather`,
    method: 'POST',
    numDigits: 1
  })

  if(strategy === 'play') {

    const asset = await Asset.query(qb => {
      qb.where('id', recording_id)
    }).fetch({
      transacting: req.trx
    })

    gather.play({
      loop: 0
    }, asset.get('signed_url'))

  } else if(strategy === 'say') {

    gather.say({
      voice
    }, message)

  }

  return {
    twiml: response.toString()
  }

}

export default voiceQuestion
