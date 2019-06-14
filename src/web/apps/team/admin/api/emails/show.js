import EmailSerializer from '../../../serializers/email_serializer'
import Email from '../../../../maha/models/email'

const showRoute = async (req, res) => {

  const email = await Email.where({
    id: req.params.id
  }).fetch({
    withRelated: [
      {
        activities: qb => qb.orderBy('created_at','asc')
      },
      'activities.link','user.photo'
    ],
    transacting: req.trx
  })

  if(!email) return req.status(404).respond({
    code: 404,
    message: 'Unable to load email'
  })

  res.status(200).respond(email, (email) => {
    return EmailSerializer(req, req.trx, email)
  })

}

export default showRoute
