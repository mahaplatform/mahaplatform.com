import Asset from '../../../../maha/models/asset'
import { twiml } from 'twilio'

const play = async (req, { enrollment, step }) => {

  const { loop, recording_id } = step.get('config')

  const asset = await Asset.query(qb => {
    qb.where('id', recording_id)
  }).fetch({
    transacting: req.trx
  })

  const response = new twiml.VoiceResponse()

  response.play({
    loop
  }, asset.get('signed_url'))

  response.redirect({
    action: `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}/next`,
    method: 'POST'
  })

  return {
    twiml: response.toString()
  }

}

export default play
