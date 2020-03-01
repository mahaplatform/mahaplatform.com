import { updateRelated } from '../../../../core/services/routes/relations'
import _ from 'lodash'

export const updateInterests = async (req, params) => {

  const { contact, topic_id } = params

  await contact.load(['topics'], {
    transacting: req.trx
  })

  const ids = _.uniq([
    ...contact.related('topics').map(topic => topic.get('id')),
    topic_id
  ])

  await updateRelated(req, {
    object: contact,
    related: 'topics',
    table: 'crm_interests',
    ids,
    foreign_key: 'contact_id',
    related_foreign_key: 'topic_id'
  })

  return {}

}
