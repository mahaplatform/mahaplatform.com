import EmailSerializer from '../../../serializers/email_serializer'
import Email from '../../../models/email'

const showRoute = async (req, res) => {

  const email = await Email.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!email) return res.status(404).respond({
    code: 404,
    message: 'Unable to load email'
  })

  res.status(200).respond(email, EmailSerializer)

}

export default showRoute
