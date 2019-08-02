import { updateRelated } from '../../../../../core/services/routes/relations'
import { activity } from '../../../../../core/services/routes/activities'
import ContactSerializer from '../../../serializers/contact_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import generateCode from '../../../../../core/utils/generate_code'
import { processValues } from '../../../../maha/services/values'
import socket from '../../../../../core/services/routes/emitter'
import { contactActivity } from '../../../services/activities'
import Field from '../../../../maha/models/field'
import Contact from '../../../models/contact'

const createRoute = async (req, res) => {

  req.fields = await Field.scope({
    team: req.team
  }).query(qb => {
    qb.where('parent_type', 'crm_contacts')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const values = await processValues(req, {
    parent_type: 'crm_contacts',
    values: req.body.values
  })

  const contact = await Contact.forge({
    team_id: req.team.get('id'),
    code: generateCode(),
    ...whitelist(req.body, ['first_name','last_name','email','phone','photo_id']),
    values
  }).save(null, {
    transacting: req.trx
  })

  await updateRelated(req, {
    object: contact,
    related: 'tags',
    table: 'crm_taggings',
    ids: req.body.tag_ids,
    foreign_key: 'contact_id',
    related_foreign_key: 'tag_id'
  })

  await updateRelated(req, {
    object: contact,
    related: 'organizations',
    table: 'crm_contacts_organizations',
    ids: req.body.organization_ids,
    foreign_key: 'contact_id',
    related_foreign_key: 'organization_id'
  })

  await contactActivity(req, {
    user: req.user,
    contact,
    type: 'edit',
    story: 'created the contact',
    changes: [
      { action: 'added', field: 'First Name', value: 'Greg' },
      { action: 'added', field: 'Last Name', value: 'Kops' }
    ]
  })

  await activity(req, {
    story: 'created {object}',
    object: contact
  })

  await socket.refresh(req, [
    '/admin/crm/contacts'
  ])

  await contact.load(['photo','tags'], {
    transacting: req.trx
  })

  res.status(200).respond(contact, ContactSerializer)

}

export default createRoute
