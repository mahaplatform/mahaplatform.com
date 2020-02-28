import { updateRelated } from '../../../../core/services/routes/relations'
import _ from 'lodash'

export const updateList = async (req, params) => {

  const { contact, list_id } = params

  await contact.load(['lists'], {
    transacting: req.trx
  })

  const ids = _.uniq([
    ...contact.related('lists').map(list => list.get('id')),
    list_id
  ])

  await updateRelated(req, {
    object: contact,
    related: 'lists',
    table: 'crm_subscriptions',
    ids,
    foreign_key: 'contact_id',
    related_foreign_key: 'list_id'
  })

}
