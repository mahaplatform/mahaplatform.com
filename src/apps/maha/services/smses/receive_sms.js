import SMSAttachment from '@apps/maha/models/sms_attachment'
import { createAssetFromUrl } from '../assets'
import Number from '@apps/maha/models/number'
import SMS from '@apps/maha/models/sms'
import moment from 'moment'

const receiveSMS = async (req, params) => {

  const from_number = await Number.fetchOrCreate({
    number: params.from_number
  }, {
    transacting: req.trx
  })

  const to_number = await Number.fetchOrCreate({
    number: params.to_number
  }, {
    transacting: req.trx
  })

  const { body, sid, incoming } = params

  const num_media = parseInt(incoming.NumMedia)

  const sms = await SMS.forge({
    team_id: params.team_id || req.team.get('id'),
    from_number_id: from_number.get('id'),
    to_number_id: to_number.get('id'),
    direction: 'inbound',
    num_media,
    body,
    sid,
    status: 'received',
    received_at: moment()
  }).save(null, {
    transacting: req.trx
  })

  if(num_media > 0) {
    await Promise.map(Array(num_media).fill(0), async(num, index) => {
      if(!incoming[`MediaUrl${index}`]) return
      const asset = await createAssetFromUrl(req, {
        url: incoming[`MediaUrl${index}`],
        team_id: params.team_id || req.team.get('id'),
        user_id: null,
        source: 'sms'
      })
      await SMSAttachment.forge({
        team_id: params.team_id || req.team.get('id'),
        sms_id: sms.get('id'),
        asset_id: asset.get('id')
      }).save(null, {
        transacting: req.trx
      })
    })
  }

  return sms

}

export default receiveSMS
