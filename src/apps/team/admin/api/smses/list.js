import SMSSerializer from '../../../serializers/sms_serializer'
import SMS from '../../../../maha/models/sms'

const listRoute = async (req, res) => {

  const smses = await SMS.scope({
    team: req.team
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['to','from'],
    transacting: req.trx
  })

  res.status(200).respond(smses, SMSSerializer)

}

export default listRoute
