import SMSSerializer from '@apps/team/serializers/sms_serializer'
import SMS from '@apps/maha/models/sms'

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
    withRelated: ['to_number','from_number'],
    transacting: req.trx
  })

  await res.status(200).respond(smses, SMSSerializer)

}

export default listRoute
