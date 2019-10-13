import SMSSerializer from '../../../serializers/sms_serializer'
import SMS from '../../../../maha/models/sms'

const listRoute = async (req, res) => {

  const smses = await SMS.scope({
    team: req.team
  }).sort({
    sort: req.query.$sort,
    defaultSort: '-created_at',
    sortParams: ['created_at']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['to','from','attachments.asset'],
    transacting: req.trx
  })

  res.status(200).respond(smses, SMSSerializer)

}

export default listRoute
