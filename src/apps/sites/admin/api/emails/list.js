import EmailSerializer from '../../../serializers/email_serializer'
import Email from '../../../models/email'

const listRoute = async (req, res) => {

  const emails = await Email.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('site_id', req.params.site_id)
    },
    filter: {
      params: req.query.$filter
    },
    sort: {
      params: req.query.$sort,
      defaults: 'id',
      allowed: ['id']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(emails, EmailSerializer)

}

export default listRoute
