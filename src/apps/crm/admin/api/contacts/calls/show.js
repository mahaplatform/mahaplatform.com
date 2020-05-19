import ContactCallSerializer from '../../../../serializers/contact_call_serializer'
import ContactCall from '../../../../models/contact_call'

const showRoute = async (req, res) => {

  const call = await ContactCall.where({
    contact_id: req.params.contact_id,
    id: req.params.id
  }).fetch({
    withRelated: ['attachments'],
    transacting: req.trx
  })

  if(!call) return res.status(404).respond({
    code: 404,
    message: 'Unable to load call'
  })

  res.status(200).respond(call, ContactCallSerializer)

}

export default showRoute
