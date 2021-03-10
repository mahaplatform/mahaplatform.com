import CallSerializer from '@apps/maha/serializers/call_serializer'
import Call from '@apps/maha/models/call'

const showRoute = async (req, res) => {

  const call = await Call.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['to','from','program.logo','program.phone_number','user.photo','phone_number.contact.photo','from_user.photo','to_user.photo'],
    transacting: req.trx
  })

  if(!call) return res.status(404).respond({
    code: 404,
    message: 'Unable to load call'
  })

  await res.status(200).respond(call, CallSerializer)

}

export default showRoute
