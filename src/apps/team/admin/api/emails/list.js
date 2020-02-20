import EmailSerializer from '../../../serializers/email_serializer'
import Email from '../../../../maha/models/email'

const listRoute = async (req, res) => {

  const emails = await Email.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      alowed: ['user_id','sent_at']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['id','to','subject','status','sent_at','created_at']
    },
    page: req.query.$page,
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(emails, EmailSerializer)

}

export default listRoute
