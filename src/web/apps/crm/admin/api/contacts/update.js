import ContactSerializer from '../../../serializers/contact_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Contact from '../../../models/contact'

const updateRoute = async (req, res) => {

  const contact = await Contact.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  await contact.save(whitelist(req.body, ['first_name','last_name','email','phone','photo_id']), {
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: contact
  })

  await socket.refresh(req, [
    '/admin/crm/contacts',
    `/admin/crm/contacts/${contact.get('id')}`
  ])

  await contact.load(['photo'], {
    transacting: req.trx
  })

  res.status(200).respond(contact, ContactSerializer)

}

export default updateRoute
