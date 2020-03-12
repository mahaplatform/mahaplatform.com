import Asset from '../../../../maha/models/asset'

import { twiml } from 'twilio'

export const play = async (req, { step }) => {

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

  return {
    twiml: response.toString()
  }

}
