import { activity } from '../../../../../core/services/routes/activities'
import ContactSerializer from '../../../serializers/contact_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Contact from '../../../models/contact'

const createRoute = async (req, res) => {

  const contact = await Contact.forge({
    team_id: req.team.get('id'),
    values: {},
    ...whitelist(req.body, ['first_name','last_name','email','phone','photo_id'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: contact
  })

  await socket.refresh(req, [
    '/admin/crm/contacts'
  ])

  await contact.load(['photo'], {
    transacting: req.trx
  })

  res.status(200).respond(contact, ContactSerializer)

}

export default createRoute
