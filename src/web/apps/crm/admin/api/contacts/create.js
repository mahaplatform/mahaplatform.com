import { activity } from '../../../../../core/services/routes/activities'
import ContactSerializer from '../../../serializers/contact_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import { processValues } from '../../../../maha/services/values'
import socket from '../../../../../core/services/routes/emitter'
import Field from '../../../../maha/models/field'
import Contact from '../../../models/contact'

const createRoute = async (req, res) => {

  const values = await processValues(req, {
    parent_type: 'crm_contacts',
    values: req.body.values
  })

  const contact = await Contact.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['first_name','last_name','email','phone','photo_id']),
    values
  }).save(null, {
    transacting: req.trx
  })

  req.fields = await Field.scope({
    team: req.team
  }).query(qb => {
    qb.where('parent_type', 'crm_contacts')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

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
