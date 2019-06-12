import EmailSerializer from '../../../serializers/email_serializer'
import Email from '../../../../maha/models/email'

const listRoute = async (req, res) => {

  const emails = await Email.query(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    filterParams: ['user_id','sent_at']
  }).sort({
    sort: req.query.$sort,
    defaultSort: '-created_at',
    sortParams: ['id','to','subject','status','sent_at','created_at']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(emails, (email) => {
    return EmailSerializer(req, req.trx, email)
  })

}

export default listRoute
