import { updateRelated } from '../../../../../core/services/routes/relations'
import _ from 'lodash'

const updateInterests = async (req, params) => {

  const { config, enrollment } = params

  const { topic_id } = config

  if(!topic_id) return {}

  await enrollment.load(['contact.topics'], {
    transacting: req.trx
  })

  const contact = enrollment.related('contact')

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

export default updateInterests
