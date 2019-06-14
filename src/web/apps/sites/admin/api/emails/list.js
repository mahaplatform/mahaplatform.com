import EmailSerializer from '../../../serializers/email_serializer'
import Email from '../../../models/email'

const listRoute = async (req, res) => {

  const emails = await Email.scope({
    team: req.team
  }).query(qb => {
    qb.where('site_id', req.params.site_id)
  }).filter({
    filter: req.query.$filter
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'id',
    sortParams: ['id']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(emails, (email) => {
    return EmailSerializer(req, email)
  })

}

export default listRoute
