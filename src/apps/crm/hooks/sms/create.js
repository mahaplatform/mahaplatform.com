import { createAssetFromUrl } from '../../../maha/services/assets'
import SMSAttachment from '../../../maha/models/sms_attachment'
import PhoneNumber from '../../models/phone_number'
import Number from '../../../maha/models/number'
import SMS from '../../../maha/models/sms'

const createRoute = async (req, res) => {

  const { To, From, MessageSid, Body } = req.body

  const number = await Number.query(qb => {
    qb.where('number', To)
  }).fetch({
    transacting: req.trx
  })

  if(!number) return res.status(404).respond({
    code: 404,
    message: 'Unable to load to number'
  })

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('number', From)
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  })

  if(!phone_number) return res.status(404).respond({
    code: 404,
    message: 'Unable to load from number'
  })

  const sms = await SMS.forge({
    team_id: phone_number.get('team_id'),
    phone_number_id: phone_number.get('id'),
    number_id: number.get('id'),
    type: 'incoming',
    sid: MessageSid,
    status: 'received',
    body: Body
  }).save({}, {
    transacting: req.trx
  })

  await Promise.map(Array(10).fill(0), async(number, index) => {
    if(!req.body[`MediaUrl${index}`]) return
    const asset = await createAssetFromUrl(req, {
      url: req.body[`MediaUrl${index}`],
      team_id: phone_number.get('team_id'),
      user_id: null,
      source: 'sms'
    })
    await SMSAttachment.forge({
      team_id: phone_number.get('team_id'),
      sms_id: sms.get('id'),
      asset_id: asset.get('id')
    }).save({}, {
      transacting: req.trx
    })

  })

  res.status(200).respond(true)

}

export default createRoute
