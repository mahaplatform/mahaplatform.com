import { updateRelated } from '../../../../../core/services/routes/relations'
import _ from 'lodash'

export const updateLists = async (req, params) => {

  const { enrollment, list_id } = params

  if(!list_id) return {}

  await enrollment.load(['contact.lists'], {
    transacting: req.trx
  })

  const contact = enrollment.related('contact')

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

  return {}

}
