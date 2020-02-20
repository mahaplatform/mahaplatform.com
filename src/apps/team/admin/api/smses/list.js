import SMSSerializer from '../../../serializers/sms_serializer'
import SMS from '../../../../maha/models/sms'

const listRoute = async (req, res) => {

  const smses = await SMS.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['to','from'],
    transacting: req.trx
  })

  res.status(200).respond(smses, SMSSerializer)

}

export default listRoute
